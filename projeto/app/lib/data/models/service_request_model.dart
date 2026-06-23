import '../../domain/entities/service_request.dart';

class ServiceRequestModel extends ServiceRequest {
  const ServiceRequestModel({
    required super.id,
    required super.clientId,
    required super.clientName,
    required super.providerId,
    required super.categoryId,
    required super.title,
    required super.description,
    required super.status,
    required super.scheduledDate,
    super.estimatedPrice,
    super.finalPrice,
    super.categoryName,
  });

  factory ServiceRequestModel.fromJson(Map<String, dynamic> json) {
    final category = json['category'] as Map<String, dynamic>?;

    return ServiceRequestModel(
      id: json['id'] as String,
      clientId: json['clientId'] as String,
      clientName: json['clientName']?.toString() ?? '',
      providerId: json['providerId'] as String?,
      categoryId: json['categoryId'] as String,
      title: json['title'] as String,
      description: json['description'] as String,
      status: json['status'] as String,
      scheduledDate: DateTime.parse(json['scheduledDate'] as String),
      estimatedPrice: (json['estimatedPrice'] as num?)?.toDouble(),
      finalPrice: (json['finalPrice'] as num?)?.toDouble(),
      categoryName: category?['name'] as String?,
    );
  }
}
