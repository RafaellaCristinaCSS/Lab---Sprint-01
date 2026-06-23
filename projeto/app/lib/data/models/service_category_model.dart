import '../../domain/entities/service_category.dart';

class ServiceCategoryModel extends ServiceCategory {
  const ServiceCategoryModel({
    required super.id,
    required super.name,
    required super.description,
  });

  factory ServiceCategoryModel.fromJson(Map<String, dynamic> json) {
    return ServiceCategoryModel(
      id: json['id'] as String,
      name: json['name'] as String,
      description: json['description'] as String,
    );
  }
}
