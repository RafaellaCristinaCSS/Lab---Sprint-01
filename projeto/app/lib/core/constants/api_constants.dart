class ApiConstants {
  static const String defaultBaseUrl = 'http://10.0.2.2:3000';

  static const String usersPath = '/api/users';
  static const String categoriesPath = '/api/categories';
  static const String serviceRequestsPath = '/service-requests';
  static const String requestsPath = '/api/requests';

  static String assignPath(String requestId) =>
      '$serviceRequestsPath/$requestId/assign';

  static String startPath(String requestId) =>
      '$serviceRequestsPath/$requestId/start';

  static String completePath(String requestId) =>
      '$serviceRequestsPath/$requestId/complete';

  static String cancelPath(String requestId) =>
      '$serviceRequestsPath/$requestId/cancel';

  static String clientRequestsPath(String clientId) =>
      '$requestsPath/client/$clientId';

  static String providerRequestsPath(String providerId) =>
      '$requestsPath/provider/$providerId';

  static String openRequestsPath = '$requestsPath/open';
}
