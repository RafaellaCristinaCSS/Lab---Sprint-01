import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../core/constants/api_config.dart';
import '../../data/datasources/remote_api_datasource.dart';
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
  String? _connectionMessage;
  bool _testingConnection = false;

  @override
  void initState() {
    super.initState();
    final defaultUrl = ApiConfig.resolveBaseUrl(ApiConfig.defaultBaseUrl);
    _baseUrlController = TextEditingController(text: defaultUrl);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      context.read<SessionProvider>().setBaseUrl(defaultUrl);
      _baseUrlController.text = context.read<SessionProvider>().baseUrl;
    });
  }

  @override
  void dispose() {
    _baseUrlController.dispose();
    super.dispose();
  }

  Future<void> _testConnection() async {
    setState(() {
      _testingConnection = true;
      _connectionMessage = null;
    });

    final session = context.read<SessionProvider>();
    final url = _baseUrlController.text.trim();
    session.setBaseUrl(url);
    final remote = RemoteApiDataSource(baseUrl: url);

    try {
      await remote.checkHealth();
      setState(() {
        _connectionMessage = 'Conexao OK com ${session.baseUrl}';
      });
    } catch (error) {
      setState(() {
        _connectionMessage = error.toString();
      });
    } finally {
      setState(() => _testingConnection = false);
    }
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
              decoration: InputDecoration(
                labelText: 'URL da API',
                helperText: ApiConfig.platformHint,
                border: const OutlineInputBorder(),
              ),
              controller: _baseUrlController,
              onChanged: (value) {
                final resolved = ApiConfig.resolveBaseUrl(value);
                if (resolved != value.trim().replaceAll(RegExp(r'/+$'), '')) {
                  _baseUrlController.value = TextEditingValue(
                    text: resolved,
                    selection: TextSelection.collapsed(offset: resolved.length),
                  );
                }
                session.setBaseUrl(resolved);
              },
            ),
            const SizedBox(height: 8),
            OutlinedButton.icon(
              onPressed: _testingConnection ? null : _testConnection,
              icon: _testingConnection
                  ? const SizedBox(
                      width: 16,
                      height: 16,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : const Icon(Icons.wifi_tethering),
              label: const Text('Testar conexao com backend'),
            ),
            if (_connectionMessage != null) ...[
              const SizedBox(height: 8),
              Text(
                _connectionMessage!,
                style: TextStyle(
                  color: _connectionMessage!.startsWith('Conexao OK')
                      ? Colors.green.shade700
                      : Colors.red.shade700,
                ),
              ),
            ],
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
