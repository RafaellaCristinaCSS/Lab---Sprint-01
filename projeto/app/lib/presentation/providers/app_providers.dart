import 'dart:async';

import 'package:flutter/foundation.dart';

import '../../core/constants/api_config.dart';
import '../../domain/entities/app_user.dart';
import '../../domain/entities/service_category.dart';
import '../../domain/entities/service_request.dart';
import '../../domain/repositories/repositories.dart';

class SessionProvider extends ChangeNotifier {
  SessionProvider() : _baseUrl = ApiConfig.defaultBaseUrl;

  AppUser? _currentUser;
  UserType? _selectedProfile;
  late String _baseUrl;

  AppUser? get currentUser => _currentUser;
  UserType? get selectedProfile => _selectedProfile;
  String get baseUrl => _baseUrl;

  bool get isLoggedIn => _currentUser != null;

  void selectProfile(UserType profile) {
    _selectedProfile = profile;
    notifyListeners();
  }

  void setBaseUrl(String value) {
    _baseUrl = ApiConfig.resolveBaseUrl(value);
    notifyListeners();
  }

  void login(AppUser user) {
    _currentUser = user;
    notifyListeners();
  }

  void logout() {
    _currentUser = null;
    _selectedProfile = null;
    notifyListeners();
  }
}

class ServiceRequestProvider extends ChangeNotifier {
  ServiceRequestProvider({
    required ServiceRequestRepository repository,
    required CategoryRepository categoryRepository,
  })  : _repository = repository,
        _categoryRepository = categoryRepository;

  final ServiceRequestRepository _repository;
  final CategoryRepository _categoryRepository;

  List<ServiceRequest> _requests = [];
  List<ServiceRequest> _openRequests = [];
  List<ServiceRequest> _providerRequests = [];
  List<ServiceCategory> _categories = [];
  bool _loading = false;
  String? _error;
  String? _successMessage;
  Timer? _pollingTimer;

  List<ServiceRequest> get requests => _requests;
  List<ServiceRequest> get openRequests => _openRequests;
  List<ServiceRequest> get providerRequests => _providerRequests;
  List<ServiceCategory> get categories => _categories;
  bool get loading => _loading;
  String? get error => _error;
  String? get successMessage => _successMessage;

  void clearMessages() {
    _error = null;
    _successMessage = null;
    notifyListeners();
  }

  Future<void> loadCategories() async {
    try {
      _categories = await _categoryRepository.getCategories();
      notifyListeners();
    } catch (error) {
      _error = error.toString();
      notifyListeners();
    }
  }

  Future<void> loadClientRequests(String clientId) async {
    await _load(() => _repository.getClientRequests(clientId));
  }

  Future<void> loadOpenRequests() async {
    await _loadList(
      fetch: () => _repository.getOpenRequests(),
      onSuccess: (items) => _openRequests = items,
    );
  }

  Future<void> loadProviderRequests(String providerId) async {
    await _loadList(
      fetch: () => _repository.getProviderRequests(providerId),
      onSuccess: (items) => _providerRequests = items,
    );
  }

  Future<void> createRequest({
    required String clientId,
    required String categoryId,
    required String title,
    required String description,
    required DateTime scheduledDate,
    double? estimatedPrice,
  }) async {
    await _action(() async {
      await _repository.createRequest(
        clientId: clientId,
        categoryId: categoryId,
        title: title,
        description: description,
        scheduledDate: scheduledDate,
        estimatedPrice: estimatedPrice,
      );
      _successMessage = 'Solicitacao criada. Aguardando processamento assincrono.';
      await loadClientRequests(clientId);
    });
  }

  Future<void> cancelRequest(String requestId, String clientId) async {
    await _action(() async {
      await _repository.cancelRequest(requestId);
      _successMessage = 'Solicitacao cancelada.';
      await loadClientRequests(clientId);
    });
  }

  Future<void> assignRequest({
    required String requestId,
    required String providerId,
  }) async {
    await _action(() async {
      await _repository.assignProvider(
        requestId: requestId,
        providerId: providerId,
      );
      _successMessage = 'Solicitacao aceita com sucesso.';
      await loadOpenRequests();
      await loadProviderRequests(providerId);
    });
  }

  Future<void> startRequest({
    required String requestId,
    required String providerId,
  }) async {
    await _action(() async {
      await _repository.startRequest(
        requestId: requestId,
        providerId: providerId,
      );
      _successMessage = 'Servico iniciado.';
      await loadProviderRequests(providerId);
    });
  }

  Future<void> completeRequest({
    required String requestId,
    required String providerId,
    double? finalPrice,
  }) async {
    await _action(() async {
      await _repository.completeRequest(
        requestId: requestId,
        providerId: providerId,
        finalPrice: finalPrice,
      );
      _successMessage = 'Servico concluido.';
      await loadProviderRequests(providerId);
    });
  }

  void startPolling(Future<void> Function() loader, {Duration? interval}) {
    stopPolling();
    _pollingTimer = Timer.periodic(interval ?? const Duration(seconds: 5), (_) {
      loader();
    });
  }

  void stopPolling() {
    _pollingTimer?.cancel();
    _pollingTimer = null;
  }

  Future<void> _load(Future<List<ServiceRequest>> Function() fetch) async {
    await _loadList(fetch: fetch, onSuccess: (items) => _requests = items);
  }

  Future<void> _loadList({
    required Future<List<ServiceRequest>> Function() fetch,
    required void Function(List<ServiceRequest> items) onSuccess,
  }) async {
    _loading = true;
    _error = null;
    notifyListeners();

    try {
      onSuccess(await fetch());
    } catch (error) {
      _error = error.toString();
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  Future<void> _action(Future<void> Function() operation) async {
    _loading = true;
    _error = null;
    _successMessage = null;
    notifyListeners();

    try {
      await operation();
    } catch (error) {
      _error = error.toString();
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  @override
  void dispose() {
    stopPolling();
    super.dispose();
  }
}

class UserSelectionProvider extends ChangeNotifier {
  UserSelectionProvider(this._repository);

  final UserRepository _repository;

  List<AppUser> _users = [];
  bool _loading = false;
  String? _error;

  List<AppUser> get users => _users;
  bool get loading => _loading;
  String? get error => _error;

  Future<void> loadUsers(UserType type) async {
    _loading = true;
    _error = null;
    notifyListeners();

    try {
      _users = await _repository.getUsersByType(type);
    } catch (error) {
      _error = error.toString();
    } finally {
      _loading = false;
      notifyListeners();
    }
  }
}
