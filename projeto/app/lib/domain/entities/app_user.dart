enum UserType { client, provider }

class AppUser {
  const AppUser({
    required this.id,
    required this.name,
    required this.email,
    required this.userType,
  });

  final String id;
  final String name;
  final String email;
  final UserType userType;

  bool get isClient => userType == UserType.client;
  bool get isProvider => userType == UserType.provider;
}
