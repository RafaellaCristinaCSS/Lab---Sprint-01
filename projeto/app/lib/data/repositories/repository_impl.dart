import '../../domain/entities/app_user.dart';
import '../../domain/entities/service_category.dart';
import '../../domain/entities/service_request.dart';
import '../../domain/repositories/repositories.dart';
import '../datasources/remote_api_datasource.dart';

class UserRepositoryImpl implements UserRepository {
  UserRepositoryImpl(this._remote);

  final RemoteApiDataSource _remote;

  @override
  Future<List<AppUser>> getUsersByType(UserType type) {
    final apiType = type == UserType.client ? 'CLIENT' : 'PROVIDER';
    return _remote.fetchUsersByType(apiType);
  }
}

class CategoryRepositoryImpl implements CategoryRepository {
  CategoryRepositoryImpl(this._remote);

  final RemoteApiDataSource _remote;

  @override
  Future<List<ServiceCategory>> getCategories() {
    return _remote.fetchCategories();
  }
}

class ServiceRequestRepositoryImpl implements ServiceRequestRepository {
  ServiceRequestRepositoryImpl(this._remote);

  final RemoteApiDataSource _remote;

  @override
  Future<List<ServiceRequest>> getClientRequests(String clientId) {
    return _remote.fetchClientRequests(clientId);
  }

  @override
  Future<List<ServiceRequest>> getOpenRequests() {
    return _remote.fetchOpenRequests();
  }

  @override
  Future<List<ServiceRequest>> getProviderRequests(String providerId) {
    return _remote.fetchProviderRequests(providerId);
  }

  @override
  Future<ServiceRequest> createRequest({
    required String clientId,
    required String categoryId,
    required String title,
    required String description,
    required DateTime scheduledDate,
    double? estimatedPrice,
  }) {
    return _remote.createRequest({
      'clientId': clientId,
      'categoryId': categoryId,
      'title': title,
      'description': description,
      'scheduledDate': scheduledDate.toUtc().toIso8601String(),
      if (estimatedPrice != null) 'estimatedPrice': estimatedPrice,
    });
  }

  @override
  Future<ServiceRequest> assignProvider({
    required String requestId,
    required String providerId,
  }) {
    return _remote.assignProvider(requestId, providerId);
  }

  @override
  Future<ServiceRequest> startRequest({
    required String requestId,
    required String providerId,
  }) {
    return _remote.startRequest(requestId, providerId);
  }

  @override
  Future<ServiceRequest> completeRequest({
    required String requestId,
    required String providerId,
    double? finalPrice,
  }) {
    return _remote.completeRequest(requestId, providerId,
        finalPrice: finalPrice);
  }

  @override
  Future<ServiceRequest> cancelRequest(String requestId) {
    return _remote.cancelRequest(requestId);
  }
}
