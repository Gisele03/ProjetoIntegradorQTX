import { Component, OnInit } from '@angular/core';
import { Iclientes } from '../service/iclientes' 
import { ClientesService } from '../service/clientes.service'; 
import { ActivatedRoute, Router} from '@angular/router'; 
import { FormControl, FormGroup } from '@angular/forms'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listarclientes',
  templateUrl: './listarclientes.component.html',
  styleUrls: ['./listarclientes.component.scss']
})
export class ListarclientesComponent implements OnInit{
  clientes: Iclientes[]=[]; 
   
  form = new FormGroup({ 
    id: new FormControl(),
    nome: new FormControl(''),
    cpf: new FormControl(''),
    rg: new FormControl(''),
    endereco: new FormControl(''),
    email: new FormControl(''),
  }) 
 
  constructor( 
    private service: ClientesService,  
    private router: Router,  
    private route: ActivatedRoute){ } 
 
  ngOnInit(): void { 
     this.Listar(); 
  } 
 
  Listar(){ 
     this.service.listar().subscribe(dados => this.clientes = dados); 
  } 

  Editar(id:number){ 
    this.router.navigate(['editar', id], {relativeTo: this.route}); 
  } 
 
  Excluir(id:number){ 
    Swal.fire({
      title: "Deletar",
      text: "Seu cadastro foi deletado!",
      icon: "error"
    }).then((result) => {
      this.service.excluir(id).subscribe( 
        success => { 
          this.service.listar().subscribe(dados => this.clientes = dados); 
        }, 
      );
      this.form.reset()
      this.router.navigate(['clientes']);
    })
  } 
}
