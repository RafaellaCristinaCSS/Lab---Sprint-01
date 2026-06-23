class ServiceRequest {
  const ServiceRequest({
    required this.id,
    required this.clientId,
    required this.clientName,
    required this.providerId,
    required this.categoryId,
    required this.title,
    required this.description,
    required this.status,
    required this.scheduledDate,
    this.estimatedPrice,
    this.finalPrice,
    this.categoryName,
  });

  final String id;
  final String clientId;
  final String clientName;
  final String? providerId;
  final String categoryId;
  final String title;
  final String description;
  final String status;
  final DateTime scheduledDate;
  final double? estimatedPrice;
  final double? finalPrice;
  final String? categoryName;

  bool get canCancel =>
      !['COMPLETED', 'CANCELLED'].contains(status);

  bool get isPending => status == 'PENDING';
  bool get isOpen => status == 'OPEN';
  bool get isAssigned => status == 'ASSIGNED';
  bool get isInProgress => status == 'IN_PROGRESS';
}
