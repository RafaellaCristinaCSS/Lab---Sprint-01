import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../core/theme/app_theme.dart';
import '../../data/datasources/remote_api_datasource.dart';
import '../../data/repositories/repository_impl.dart';
import '../../domain/entities/app_user.dart';
import 'presentation/providers/app_providers.dart';
import 'presentation/screens/profile_selection_screen.dart';

void main() {
  runApp(const HomeServiceApp());
}

class HomeServiceApp extends StatelessWidget {
  const HomeServiceApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => SessionProvider()),
        ProxyProvider<SessionProvider, RemoteApiDataSource>(
          update: (_, session, previous) =>
              RemoteApiDataSource(baseUrl: session.baseUrl),
        ),
        ProxyProvider<RemoteApiDataSource, UserRepositoryImpl>(
          update: (_, remote, __) => UserRepositoryImpl(remote),
        ),
        ProxyProvider<RemoteApiDataSource, CategoryRepositoryImpl>(
          update: (_, remote, __) => CategoryRepositoryImpl(remote),
        ),
        ProxyProvider<RemoteApiDataSource, ServiceRequestRepositoryImpl>(
          update: (_, remote, __) => ServiceRequestRepositoryImpl(remote),
        ),
        ChangeNotifierProxyProvider2<ServiceRequestRepositoryImpl,
            CategoryRepositoryImpl, ServiceRequestProvider>(
          create: (_) => ServiceRequestProvider(
            repository: ServiceRequestRepositoryImpl(
              RemoteApiDataSource(),
            ),
            categoryRepository: CategoryRepositoryImpl(
              RemoteApiDataSource(),
            ),
          ),
          update: (_, requestRepo, categoryRepo, previous) =>
              ServiceRequestProvider(
            repository: requestRepo,
            categoryRepository: categoryRepo,
          ),
        ),
        ChangeNotifierProxyProvider<UserRepositoryImpl, UserSelectionProvider>(
          create: (_) => UserSelectionProvider(
            UserRepositoryImpl(RemoteApiDataSource()),
          ),
          update: (_, repo, previous) => UserSelectionProvider(repo),
        ),
      ],
      child: Consumer<SessionProvider>(
        builder: (context, session, _) {
          final theme = session.selectedProfile == UserType.provider
              ? AppTheme.providerTheme()
              : AppTheme.clientTheme();

          return MaterialApp(
            title: 'Home Service',
            theme: theme,
            home: const ProfileSelectionScreen(),
            debugShowCheckedModeBanner: false,
          );
        },
      ),
    );
  }
}
