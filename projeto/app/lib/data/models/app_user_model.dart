import '../../domain/entities/app_user.dart';
import 'service_request_model.dart';

class AppUserModel extends AppUser {
  const AppUserModel({
    required super.id,
    required super.name,
    required super.email,
    required super.userType,
  });

  factory AppUserModel.fromJson(Map<String, dynamic> json) {
    final type = json['userType']?.toString() ?? 'CLIENT';

    return AppUserModel(
      id: json['id'] as String,
      name: json['name'] as String,
      email: json['email'] as String,
      userType: type == 'PROVIDER' ? UserType.provider : UserType.client,
    );
  }
}
