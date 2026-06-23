import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/app_providers.dart';

class CreateRequestScreen extends StatefulWidget {
  const CreateRequestScreen({super.key});

  @override
  State<CreateRequestScreen> createState() => _CreateRequestScreenState();
}

class _CreateRequestScreenState extends State<CreateRequestScreen> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _priceController = TextEditingController();
  String? _selectedCategoryId;
  DateTime _scheduledDate = DateTime.now().add(const Duration(days: 1));

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<ServiceRequestProvider>().loadCategories();
    });
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    _priceController.dispose();
    super.dispose();
  }

  Future<void> _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _scheduledDate,
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 365)),
    );

    if (picked != null) {
      setState(() => _scheduledDate = picked);
    }
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate() || _selectedCategoryId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Selecione uma categoria')),
      );
      return;
    }

    final session = context.read<SessionProvider>();
    final provider = context.read<ServiceRequestProvider>();
    final price = _priceController.text.trim().isEmpty
        ? null
        : double.tryParse(_priceController.text.trim());

    await provider.createRequest(
      clientId: session.currentUser!.id,
      categoryId: _selectedCategoryId!,
      title: _titleController.text.trim(),
      description: _descriptionController.text.trim(),
      scheduledDate: _scheduledDate,
      estimatedPrice: price,
    );

    if (!mounted) return;

    if (provider.error == null) {
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(
            'Solicitacao criada. Status inicial: PENDING (worker assincrono).',
          ),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<ServiceRequestProvider>();

    return Scaffold(
      appBar: AppBar(title: const Text('Nova solicitacao')),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            TextFormField(
              controller: _titleController,
              decoration: const InputDecoration(
                labelText: 'Titulo',
                border: OutlineInputBorder(),
              ),
              validator: (value) =>
                  value != null && value.length >= 5 ? null : 'Minimo 5 caracteres',
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _descriptionController,
              decoration: const InputDecoration(
                labelText: 'Descricao',
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
              validator: (value) =>
                  value != null && value.length >= 10 ? null : 'Minimo 10 caracteres',
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<String>(
              value: _selectedCategoryId,
              decoration: const InputDecoration(
                labelText: 'Categoria',
                border: OutlineInputBorder(),
              ),
              items: provider.categories
                  .map(
                    (category) => DropdownMenuItem(
                      value: category.id,
                      child: Text(category.name),
                    ),
                  )
                  .toList(),
              onChanged: (value) => setState(() => _selectedCategoryId = value),
            ),
            const SizedBox(height: 12),
            ListTile(
              contentPadding: EdgeInsets.zero,
              title: const Text('Data agendada'),
              subtitle: Text(_scheduledDate.toLocal().toString()),
              trailing: IconButton(
                icon: const Icon(Icons.calendar_month),
                onPressed: _pickDate,
              ),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _priceController,
              decoration: const InputDecoration(
                labelText: 'Preco estimado (opcional)',
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 24),
            FilledButton(
              onPressed: provider.loading ? null : _submit,
              child: provider.loading
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : const Text('Criar solicitacao'),
            ),
            if (provider.error != null) ...[
              const SizedBox(height: 12),
              Text(provider.error!, style: const TextStyle(color: Colors.red)),
            ],
          ],
        ),
      ),
    );
  }
}
