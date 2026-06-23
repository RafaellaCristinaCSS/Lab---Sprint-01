import 'package:flutter/material.dart';

class StatusLabels {
  static String label(String status) {
    switch (status) {
      case 'PENDING':
        return 'Processando (assincrono)';
      case 'OPEN':
        return 'Aberta';
      case 'ASSIGNED':
        return 'Atribuida';
      case 'IN_PROGRESS':
        return 'Em andamento';
      case 'COMPLETED':
        return 'Concluida';
      case 'CANCELLED':
        return 'Cancelada';
      default:
        return status;
    }
  }

  static Color color(String status) {
    switch (status) {
      case 'PENDING':
        return Colors.orange;
      case 'OPEN':
        return Colors.blue;
      case 'ASSIGNED':
        return Colors.indigo;
      case 'IN_PROGRESS':
        return Colors.deepPurple;
      case 'COMPLETED':
        return Colors.green;
      case 'CANCELLED':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }
}
