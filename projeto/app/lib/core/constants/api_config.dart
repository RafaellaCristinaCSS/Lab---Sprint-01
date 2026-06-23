import 'package:flutter/foundation.dart';

class ApiConfig {
  static const int apiPort = 3000;

  static String get defaultBaseUrl {
    if (isWebRuntime) {
      return 'http://localhost:$apiPort';
    }

    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return 'http://10.0.2.2:$apiPort';
      default:
        return 'http://localhost:$apiPort';
    }
  }

  /// Web build or app aberto no navegador (ex.: localhost:61996).
  static bool get isWebRuntime {
    if (kIsWeb) return true;

    final host = Uri.base.host;
    return host == 'localhost' || host == '127.0.0.1';
  }

  static String resolveBaseUrl(String value) {
    var url = value.trim().replaceAll(RegExp(r'/+$'), '');

    if (isWebRuntime && url.contains('10.0.2.2')) {
      return 'http://localhost:$apiPort';
    }

    return url.isEmpty ? defaultBaseUrl : url;
  }

  static String get platformHint {
    if (isWebRuntime) {
      return 'Chrome/Web (porta ${Uri.base.port}): use http://localhost:$apiPort';
    }

    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return 'Emulador Android: http://10.0.2.2:$apiPort | Celular fisico: http://SEU_IP:$apiPort';
      default:
        return 'Desktop/iOS: use http://localhost:$apiPort';
    }
  }
}
