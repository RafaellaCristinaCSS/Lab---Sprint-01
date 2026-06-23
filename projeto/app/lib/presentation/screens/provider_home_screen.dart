import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/app_providers.dart';
import '../widgets/common_widgets.dart';
import 'profile_selection_screen.dart';

class ProviderHomeScreen extends StatefulWidget {
  const ProviderHomeScreen({super.key});

  @override
  State<ProviderHomeScreen> createState() => _ProviderHomeScreenState();
}

class _ProviderHomeScreenState extends State<ProviderHomeScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    WidgetsBinding.instance.addPostFrameCallback((_) => _bootstrap());
  }

  Future<void> _bootstrap() async {
    final session = context.read<SessionProvider>();
    final provider = context.read<ServiceRequestProvider>();
    final user = session.currentUser!;

    await _refresh(user.id);
    provider.startPolling(() => _refresh(user.id));
  }

  Future<void> _refresh(String providerId) async {
    final provider = context.read<ServiceRequestProvider>();
    await provider.loadOpenRequests();
    await provider.loadProviderRequests(providerId);
  }

  @override
  void dispose() {
    _tabController.dispose();
    context.read<ServiceRequestProvider>().stopPolling();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final session = context.watch<SessionProvider>();
    final provider = context.watch<ServiceRequestProvider>();
    final user = session.currentUser!;

    return Scaffold(
      appBar: AppBar(
        title: Text('Fornecedor - ${user.name}'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Disponiveis'),
            Tab(text: 'Meus servicos'),
          ],
        ),
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
        loading: provider.loading &&
            provider.openRequests.isEmpty &&
            provider.providerRequests.isEmpty,
        child: Column(
          children: [
            FeedbackBanner(
              error: provider.error,
              success: provider.successMessage,
              onDismiss: provider.clearMessages,
            ),
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  RefreshIndicator(
                    onRefresh: () => _refresh(user.id),
                    child: provider.openRequests.isEmpty
                        ? ListView(
                            children: const [
                              SizedBox(height: 120),
                              Icon(Icons.search_off, size: 64, color: Colors.grey),
                              SizedBox(height: 12),
                              Text(
                                'Nenhuma solicitacao aberta no momento',
                                textAlign: TextAlign.center,
                              ),
                            ],
                          )
                        : ListView.builder(
                            itemCount: provider.openRequests.length,
                            itemBuilder: (context, index) {
                              final request = provider.openRequests[index];
                              return RequestCard(
                                request: request,
                                actions: [
                                  FilledButton.icon(
                                    onPressed: () async {
                                      await provider.assignRequest(
                                        requestId: request.id,
                                        providerId: user.id,
                                      );
                                    },
                                    icon: const Icon(Icons.check),
                                    label: const Text('Aceitar'),
                                  ),
                                ],
                              );
                            },
                          ),
                  ),
                  RefreshIndicator(
                    onRefresh: () => _refresh(user.id),
                    child: provider.providerRequests.isEmpty
                        ? ListView(
                            children: const [
                              SizedBox(height: 120),
                              Text(
                                'Voce ainda nao aceitou servicos',
                                textAlign: TextAlign.center,
                              ),
                            ],
                          )
                        : ListView.builder(
                            itemCount: provider.providerRequests.length,
                            itemBuilder: (context, index) {
                              final request = provider.providerRequests[index];
                              return RequestCard(
                                request: request,
                                actions: [
                                  if (request.isAssigned)
                                    FilledButton.icon(
                                      onPressed: () async {
                                        await provider.startRequest(
                                          requestId: request.id,
                                          providerId: user.id,
                                        );
                                      },
                                      icon: const Icon(Icons.play_arrow),
                                      label: const Text('Iniciar'),
                                    ),
                                  if (request.isInProgress || request.isAssigned)
                                    FilledButton.icon(
                                      onPressed: () async {
                                        await provider.completeRequest(
                                          requestId: request.id,
                                          providerId: user.id,
                                          finalPrice: request.estimatedPrice,
                                        );
                                      },
                                      icon: const Icon(Icons.done_all),
                                      label: const Text('Concluir'),
                                    ),
                                ],
                              );
                            },
                          ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
