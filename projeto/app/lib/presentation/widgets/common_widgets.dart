import 'package:flutter/material.dart';

import '../../core/theme/app_theme.dart';
import '../../core/utils/status_labels.dart';
import '../../domain/entities/service_request.dart';

class StatusChip extends StatelessWidget {
  const StatusChip({super.key, required this.status});

  final String status;

  @override
  Widget build(BuildContext context) {
    final color = StatusLabels.color(status);

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.15),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        StatusLabels.label(status),
        style: TextStyle(color: color, fontWeight: FontWeight.w600),
      ),
    );
  }
}

class RequestCard extends StatelessWidget {
  const RequestCard({
    super.key,
    required this.request,
    this.actions = const [],
  });

  final ServiceRequest request;
  final List<Widget> actions;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    request.title,
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                ),
                StatusChip(status: request.status),
              ],
            ),
            const SizedBox(height: 8),
            Text(request.description),
            const SizedBox(height: 8),
            Text('Cliente: ${request.clientName}'),
            if (request.categoryName != null)
              Text('Categoria: ${request.categoryName}'),
            Text('Agendado: ${request.scheduledDate.toLocal()}'),
            if (request.estimatedPrice != null)
              Text('Preco estimado: R\$ ${request.estimatedPrice!.toStringAsFixed(2)}'),
            if (request.isPending)
              Padding(
                padding: const EdgeInsets.only(top: 8),
                child: Text(
                  'Aguardando worker RabbitMQ liberar a solicitacao...',
                  style: TextStyle(
                    color: Theme.of(context).colorScheme.primary,
                    fontStyle: FontStyle.italic,
                  ),
                ),
              ),
            if (actions.isNotEmpty) ...[
              const SizedBox(height: 12),
              Wrap(spacing: 8, runSpacing: 8, children: actions),
            ],
          ],
        ),
      ),
    );
  }
}

class LoadingOverlay extends StatelessWidget {
  const LoadingOverlay({
    super.key,
    required this.loading,
    required this.child,
  });

  final bool loading;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        child,
        if (loading)
          Container(
            color: Colors.black26,
            child: const Center(child: CircularProgressIndicator()),
          ),
      ],
    );
  }
}

class FeedbackBanner extends StatelessWidget {
  const FeedbackBanner({
    super.key,
    this.error,
    this.success,
    this.onDismiss,
  });

  final String? error;
  final String? success;
  final VoidCallback? onDismiss;

  @override
  Widget build(BuildContext context) {
    if (error == null && success == null) {
      return const SizedBox.shrink();
    }

    final isError = error != null;

    return MaterialBanner(
      backgroundColor: isError ? Colors.red.shade50 : Colors.green.shade50,
      content: Text(
        isError ? error! : success!,
        style: TextStyle(color: isError ? Colors.red.shade900 : Colors.green.shade900),
      ),
      actions: [
        TextButton(onPressed: onDismiss, child: const Text('OK')),
      ],
    );
  }
}
