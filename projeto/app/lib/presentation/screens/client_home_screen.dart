import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/app_providers.dart';
import '../widgets/common_widgets.dart';
import 'create_request_screen.dart';
import 'profile_selection_screen.dart';

class ClientHomeScreen extends StatefulWidget {
  const ClientHomeScreen({super.key});

  @override
  State<ClientHomeScreen> createState() => _ClientHomeScreenState();
}

class _ClientHomeScreenState extends State<ClientHomeScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _bootstrap());
  }

  Future<void> _bootstrap() async {
    final session = context.read<SessionProvider>();
    final provider = context.read<ServiceRequestProvider>();
    final user = session.currentUser!;

    await provider.loadClientRequests(user.id);
    provider.startPolling(() => provider.loadClientRequests(user.id));
  }

  @override
  void dispose() {
    context.read<ServiceRequestProvider>().stopPolling();
    super.dispose();
  }

  Future<void> _refresh() async {
    final user = context.read<SessionProvider>().currentUser!;
    await context.read<ServiceRequestProvider>().loadClientRequests(user.id);
  }

  @override
  Widget build(BuildContext context) {
    final session = context.watch<SessionProvider>();
    final provider = context.watch<ServiceRequestProvider>();

    return Scaffold(
      appBar: AppBar(
        title: Text('Cliente - ${session.currentUser?.name ?? ''}'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              provider.stopPolling();
              session.logout();
              Navigator.pushAndRemoveUntil(
                context,
                MaterialPageRoute(builder: (_) => const ProfileSelectionScreen()),
                (_) => false,
              );
            },
          ),
        ],
      ),
      body: LoadingOverlay(
        loading: provider.loading && provider.requests.isEmpty,
        child: Column(
          children: [
            FeedbackBanner(
              error: provider.error,
              success: provider.successMessage,
              onDismiss: provider.clearMessages,
            ),
            Expanded(
              child: RefreshIndicator(
                onRefresh: _refresh,
                child: provider.requests.isEmpty
                    ? ListView(
                        children: const [
                          SizedBox(height: 120),
                          Icon(Icons.inbox, size: 64, color: Colors.grey),
                          SizedBox(height: 12),
                          Text(
                            'Nenhuma solicitacao ainda',
                            textAlign: TextAlign.center,
                          ),
                        ],
                      )
                    : ListView.builder(
                        itemCount: provider.requests.length,
                        itemBuilder: (context, index) {
                          final request = provider.requests[index];
                          return RequestCard(
                            request: request,
                            actions: [
                              if (request.canCancel)
                                OutlinedButton.icon(
                                  onPressed: () async {
                                    await provider.cancelRequest(
                                      request.id,
                                      session.currentUser!.id,
                                    );
                                  },
                                  icon: const Icon(Icons.cancel),
                                  label: const Text('Cancelar'),
                                ),
                            ],
                          );
                        },
                      ),
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () async {
          await Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => const CreateRequestScreen()),
          );
          await _refresh();
        },
        icon: const Icon(Icons.add),
        label: const Text('Nova solicitacao'),
      ),
    );
  }
}
