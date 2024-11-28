import 'package:flutter/material.dart';
import 'package:proyectofinal/models/user.dart'; 

class LandingPage extends StatelessWidget {
  final User user;

  const LandingPage({super.key, required this.user});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Bienvenido a la UASD'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Bienvenido, ${user.nombre} ${user.apellido}'),
            const SizedBox(height: 20),
            Text('Correo: ${user.email}'),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Cerrar sesión o realizar otras acciones
              },
              child: const Text('Cerrar sesión'),
            ),
          ],
        ),
      ),
    );
  }
}
