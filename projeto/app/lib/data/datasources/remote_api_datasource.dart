import 'dart:convert';

import 'package:http/http.dart' as http;

import '../../core/constants/api_config.dart';
import '../../core/constants/api_constants.dart';
import '../../domain/entities/app_user.dart';
import '../models/app_user_model.dart';
import '../models/service_category_model.dart';
import '../models/service_request_model.dart';

class ApiException implements Exception {
  ApiException(this.message);

  final String message;

  @override
  String toString() => message;
}

class RemoteApiDataSource {
  RemoteApiDataSource({http.Client? client, String? baseUrl})
      : _client = client ?? http.Client(),
        _baseUrl = _normalizeBaseUrl(
          ApiConfig.resolveBaseUrl(baseUrl ?? ApiConfig.defaultBaseUrl),
        );

  final http.Client _client;
  final String _baseUrl;

  static String _normalizeBaseUrl(String value) {
    return value.trim().replaceAll(RegExp(r'/+$'), '');
  }

  Uri _uri(String path) => Uri.parse('$_baseUrl$path');

  String _connectionErrorMessage(Object error) {
    return 'Falha ao conectar em $_baseUrl/api/users. '
        'Verifique se o backend esta rodando (docker compose up) e se a URL '
        'esta correta para sua plataforma. '
        'Web/Windows: http://localhost:3000 | '
        'Emulador Android: http://10.0.2.2:3000. '
        'Detalhe: $error';
  }

  Future<http.Response> _send(Future<http.Response> Function() request) async {
    try {
      return await request().timeout(const Duration(seconds: 15));
    } catch (error) {
      throw ApiException(_connectionErrorMessage(error));
    }
  }

  Future<Map<String, dynamic>> _decode(http.Response response) async {
    final body = response.body.isEmpty ? '{}' : response.body;

    dynamic decoded;
    try {
      decoded = jsonDecode(body);
    } catch (_) {
      throw ApiException(
        'Resposta invalida do servidor (${response.statusCode}) em $_baseUrl',
      );
    }

    if (response.statusCode >= 400) {
      final message = decoded is Map<String, dynamic>
          ? decoded['error']?.toString() ?? 'Erro na requisicao'
          : 'Erro na requisicao';
      throw ApiException(message);
    }

    return decoded as Map<String, dynamic>;
  }

  Future<List<AppUserModel>> fetchUsersByType(String userType) async {
    final response =
        await _send(() => _client.get(_uri(ApiConstants.usersPath)));
    final decoded = await _decode(response);
    final data = decoded['data'] as List<dynamic>? ?? [];

    final expectedType =
        userType.toUpperCase() == 'PROVIDER' ? UserType.provider : UserType.client;

    return data
        .map((item) => AppUserModel.fromJson(item as Map<String, dynamic>))
        .where((user) => user.userType == expectedType)
        .toList();
  }

  Future<List<ServiceCategoryModel>> fetchCategories() async {
    final response =
        await _send(() => _client.get(_uri(ApiConstants.categoriesPath)));
    final decoded = await _decode(response);
    final data = decoded['data'] as List<dynamic>? ?? [];

    return data
        .map((item) =>
            ServiceCategoryModel.fromJson(item as Map<String, dynamic>))
        .toList();
  }

  Future<List<ServiceRequestModel>> fetchClientRequests(String clientId) async {
    final response = await _send(
      () => _client.get(_uri(ApiConstants.clientRequestsPath(clientId))),
    );
    final decoded = await _decode(response);
    final data = decoded['data'] as List<dynamic>? ?? [];

    return data
        .map((item) =>
            ServiceRequestModel.fromJson(item as Map<String, dynamic>))
        .toList();
  }

  Future<List<ServiceRequestModel>> fetchOpenRequests() async {
    final response =
        await _send(() => _client.get(_uri(ApiConstants.openRequestsPath)));
    final decoded = await _decode(response);
    final data = decoded['data'] as List<dynamic>? ?? [];

    return data
        .map((item) =>
            ServiceRequestModel.fromJson(item as Map<String, dynamic>))
        .toList();
  }

  Future<List<ServiceRequestModel>> fetchProviderRequests(
      String providerId) async {
    final response = await _send(
      () => _client.get(_uri(ApiConstants.providerRequestsPath(providerId))),
    );
    final decoded = await _decode(response);
    final data = decoded['data'] as List<dynamic>? ?? [];

    return data
        .map((item) =>
            ServiceRequestModel.fromJson(item as Map<String, dynamic>))
        .toList();
  }

  Future<ServiceRequestModel> createRequest(Map<String, dynamic> payload) async {
    final response = await _send(
      () => _client.post(
        _uri(ApiConstants.serviceRequestsPath),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(payload),
      ),
    );
    final decoded = await _decode(response);
    return ServiceRequestModel.fromJson(
        decoded['data'] as Map<String, dynamic>);
  }

  Future<ServiceRequestModel> assignProvider(
      String requestId, String providerId) async {
    final response = await _send(
      () => _client.put(
        _uri(ApiConstants.assignPath(requestId)),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'providerId': providerId}),
      ),
    );
    final decoded = await _decode(response);
    return ServiceRequestModel.fromJson(
        decoded['data'] as Map<String, dynamic>);
  }

  Future<ServiceRequestModel> startRequest(
      String requestId, String providerId) async {
    final response = await _send(
      () => _client.put(
        _uri(ApiConstants.startPath(requestId)),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'providerId': providerId}),
      ),
    );
    final decoded = await _decode(response);
    return ServiceRequestModel.fromJson(
        decoded['data'] as Map<String, dynamic>);
  }

  Future<ServiceRequestModel> completeRequest(
    String requestId,
    String providerId, {
    double? finalPrice,
  }) async {
    final response = await _send(
      () => _client.put(
        _uri(ApiConstants.completePath(requestId)),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'providerId': providerId,
          if (finalPrice != null) 'finalPrice': finalPrice,
        }),
      ),
    );
    final decoded = await _decode(response);
    return ServiceRequestModel.fromJson(
        decoded['data'] as Map<String, dynamic>);
  }

  Future<ServiceRequestModel> cancelRequest(String requestId) async {
    final response = await _send(
      () => _client.put(_uri(ApiConstants.cancelPath(requestId))),
    );
    final decoded = await _decode(response);
    return ServiceRequestModel.fromJson(
        decoded['data'] as Map<String, dynamic>);
  }

  Future<bool> checkHealth() async {
    final response =
        await _send(() => _client.get(_uri('/api/health')));
    await _decode(response);
    return true;
  }
}
