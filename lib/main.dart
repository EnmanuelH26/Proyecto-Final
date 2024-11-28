import 'package:flutter/material.dart';
import 'screens/landing_page.dart';
import 'screens/login_page.dart';
import 'services/api_service.dart';
import 'models/user.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'UASD App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: FutureBuilder<User?>(
        future: ApiService.getCurrentUser(), // Verifica si el usuario está logueado
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasData) {
            return LandingPage(user: snapshot.data!); // Muestra la Landing Page si el usuario está logueado
          } else {
            return LoginPage(); // Muestra la Login Page si no hay usuario logueado
          }
        },
      ),
    );
  }
}
