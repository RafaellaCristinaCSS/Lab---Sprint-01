import 'package:flutter_test/flutter_test.dart';

import 'package:home_service_app/domain/entities/service_request.dart';

void main() {
  test('service request canCancel respects terminal statuses', () {
    final openRequest = ServiceRequest(
      id: '1',
      clientId: 'c1',
      clientName: 'Maria',
      providerId: null,
      categoryId: 'cat1',
      title: 'Titulo teste',
      description: 'Descricao teste',
      status: 'OPEN',
      scheduledDate: DateTime(2026, 6, 22),
    );

    final completedRequest = ServiceRequest(
      id: '2',
      clientId: 'c1',
      clientName: 'Maria',
      providerId: 'p1',
      categoryId: 'cat1',
      title: 'Titulo teste',
      description: 'Descricao teste',
      status: 'COMPLETED',
      scheduledDate: DateTime(2026, 6, 22),
    );

    expect(openRequest.canCancel, isTrue);
    expect(completedRequest.canCancel, isFalse);
  });
}
