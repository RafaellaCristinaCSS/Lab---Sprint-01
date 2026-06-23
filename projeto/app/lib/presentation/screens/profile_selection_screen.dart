import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../domain/entities/app_user.dart';
import '../providers/app_providers.dart';
import 'user_selection_screen.dart';

class ProfileSelectionScreen extends StatefulWidget {
  const ProfileSelectionScreen({super.key});

  @override
  State<ProfileSelectionScreen> createState() => _ProfileSelectionScreenState();
}

class _ProfileSelectionScreenState extends State<ProfileSelectionScreen> {
  late final TextEditingController _baseUrlController;

  @override
  void initState() {
    super.initState();
    _baseUrlController = TextEditingController(text: 'http://10.0.2.2:3000');
  }

  @override
  void dispose() {
    _baseUrlController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final session = context.watch<SessionProvider>();

    return Scaffold(
      appBar: AppBar(title: const Text('Home Service')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              'Escolha seu perfil',
              style: Theme.of(context).textTheme.headlineSmall,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            const Text(
              'O app adapta telas, acoes e fluxo conforme Cliente ou Fornecedor.',
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 24),
            TextField(
              decoration: const InputDecoration(
                labelText: 'URL da API',
                border: OutlineInputBorder(),
              ),
              controller: _baseUrlController,
              onChanged: session.setBaseUrl,
            ),
            const SizedBox(height: 24),
            _ProfileCard(
              title: 'Cliente',
              subtitle: 'Criar, acompanhar e cancelar solicitacoes',
              icon: Icons.person,
              color: Colors.blue,
              onTap: () {
                session.selectProfile(UserType.client);
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => const UserSelectionScreen(),
                  ),
                );
              },
            ),
            const SizedBox(height: 16),
            _ProfileCard(
              title: 'Fornecedor',
              subtitle: 'Ver disponiveis, aceitar e executar servicos',
              icon: Icons.handyman,
              color: Colors.green,
              onTap: () {
                session.selectProfile(UserType.provider);
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => const UserSelectionScreen(),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _ProfileCard extends StatelessWidget {
  const _ProfileCard({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.color,
    required this.onTap,
  });

  final String title;
  final String subtitle;
  final IconData icon;
  final Color color;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Row(
            children: [
              CircleAvatar(
                backgroundColor: color.withOpacity(0.15),
                child: Icon(icon, color: color),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title, style: Theme.of(context).textTheme.titleLarge),
                    Text(subtitle),
                  ],
                ),
              ),
              const Icon(Icons.chevron_right),
            ],
          ),
        ),
      ),
    );
  }
}
