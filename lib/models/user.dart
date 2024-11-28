// lib/models/user.dart
class User {
  final String id;
  final String nombre;
  final String apellido;
  final String username;
  final String password;
  final String email;
  final String authToken;

  User({
    required this.id,
    required this.nombre,
    required this.apellido,
    required this.username,
    required this.password,
    required this.email,
    required this.authToken,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'].toString(),
      nombre: json['nombre'],
      apellido: json['apellido'],
      username: json['username'],
      password: json['password'],
      email: json['email'],
      authToken: json['authToken'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nombre': nombre,
      'apellido': apellido,
      'username': username,
      'password': password,
      'email': email,
      'authToken': authToken,
    };
  }
}
