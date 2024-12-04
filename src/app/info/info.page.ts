import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  devs: any[] = [
    {
      name: 'Enmanuel Hernandez',
      matricula: '2022-2086',
      img: 'assets/enmanuel.jpg',
      bio: 'Soy un Desarrollador Backend Junior con conocimientos en el desarrollo de micro servicios, APIs RESTful y en .NET. He trabajado en entornos ágiles, desarrollando APIs en CA API Gateway y asegurando una comunicación fluida entre servicios. Cuento con certificaciones en Scrum y desarrollo C#, así como conocimientos en Docker, SQL Server y Azure DevOps. Me apasiona aprender constantemente y aplicar las mejores prácticas para optimizar el rendimiento de cada proyecto en el que participo.',
      show: false,
    },
    {
      name: 'Elian Sención',
      matricula: '2022-0800',
      img: 'assets/elian.jpg',
      bio: `Soy estudiante de desarrollo de software y profesional en el ámbito tecnológico como System Architect en Pega. Mi pasión por la tecnología y la innovación me ha llevado a buscar constantemente formas de aprender y mejorar, tanto en el aspecto académico como en el laboral

      Como System Architect, tengo la responsabilidad de diseñar y estructurar soluciones tecnológicas que resuelvan problemas complejos, asegurándome de que sean eficientes y sostenibles a largo plazo. Esta experiencia ha fortalecido mi capacidad para trabajar con equipos diversos y enfrentar desafíos técnicos con creatividad y análisis crítico.

      En mi camino como estudiante, disfruto aprendiendo nuevas tecnologías, perfeccionando mis habilidades en desarrollo de software y explorando metodologías ágiles. Mi objetivo es no solo dominar las herramientas y lenguajes de programación, sino también aplicar ese conocimiento para crear soluciones que marquen una diferencia en la sociedad.`,
      show: false,
    },
    {
      name: 'Jordani Perez',
      matricula: '2020-10704',
      img: 'assets/jordani.jpg',
      bio: 'Desarrollador junior, amo todo lo que a eficiencia se refiera, los problemas y aun mas el resolverlos. Me especializo en python y normalmente estoy desarrollando pequeñas herramientas para agilizar mi workflow personal y eliminar inconvenientes.',
      show: false,
    }
  ]


  constructor() { }

  ngOnInit() {
  }

}
