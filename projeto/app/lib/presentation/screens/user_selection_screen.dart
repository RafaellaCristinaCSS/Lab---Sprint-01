import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../domain/entities/app_user.dart';
import '../providers/app_providers.dart';
import 'client_home_screen.dart';
import 'provider_home_screen.dart';

class UserSelectionScreen extends StatefulWidget {
  const UserSelectionScreen({super.key});

  @override
  State<UserSelectionScreen> createState() => _UserSelectionScreenState();
}

class _UserSelectionScreenState extends State<UserSelectionScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final session = context.read<SessionProvider>();
      if (session.selectedProfile != null) {
        context.read<UserSelectionProvider>().loadUsers(session.selectedProfile!);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final session = context.watch<SessionProvider>();
    final userProvider = context.watch<UserSelectionProvider>();
    final isClient = session.selectedProfile == UserType.client;

    return Scaffold(
      appBar: AppBar(
        title: Text(isClient ? 'Selecionar Cliente' : 'Selecionar Fornecedor'),
      ),
      body: userProvider.loading
          ? const Center(child: CircularProgressIndicator())
          : userProvider.error != null
              ? Center(child: Text(userProvider.error!))
              : userProvider.users.isEmpty
                  ? const Center(
                      child: Text(
                        'Nenhum usuario encontrado. Cadastre usuarios via API/Postman.',
                      ),
                    )
                  : ListView.builder(
                      itemCount: userProvider.users.length,
                      itemBuilder: (context, index) {
                        final user = userProvider.users[index];
                        return ListTile(
                          leading: CircleAvatar(
                            child: Text(user.name.substring(0, 1)),
                          ),
                          title: Text(user.name),
                          subtitle: Text(user.email),
                          onTap: () {
                            session.login(user);
                            Navigator.pushReplacement(
                              context,
                              MaterialPageRoute(
                                builder: (_) => isClient
                                    ? const ClientHomeScreen()
                                    : const ProviderHomeScreen(),
                              ),
                            );
                          },
                        );
                      },
                    ),
    );
  }
}
