import '../entities/app_user.dart';
import '../entities/service_category.dart';
import '../entities/service_request.dart';

abstract class UserRepository {
  Future<List<AppUser>> getUsersByType(UserType type);
}

abstract class CategoryRepository {
  Future<List<ServiceCategory>> getCategories();
}

abstract class ServiceRequestRepository {
  Future<List<ServiceRequest>> getClientRequests(String clientId);
  Future<List<ServiceRequest>> getOpenRequests();
  Future<List<ServiceRequest>> getProviderRequests(String providerId);
  Future<ServiceRequest> createRequest({
    required String clientId,
    required String categoryId,
    required String title,
    required String description,
    required DateTime scheduledDate,
    double? estimatedPrice,
  });
  Future<ServiceRequest> assignProvider({
    required String requestId,
    required String providerId,
  });
  Future<ServiceRequest> startRequest({
    required String requestId,
    required String providerId,
  });
  Future<ServiceRequest> completeRequest({
    required String requestId,
    required String providerId,
    double? finalPrice,
  });
  Future<ServiceRequest> cancelRequest(String requestId);
}
