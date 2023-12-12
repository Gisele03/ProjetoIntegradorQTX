import { Component, OnInit } from '@angular/core';
import { idepartamento } from '../service/idepartamento' 
import { DepartamentoService } from '../service/departamento.service'; 
import { ActivatedRoute, Router} from '@angular/router'; 
import { FormControl, FormGroup } from '@angular/forms'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listardepartamento',
  templateUrl: './listardepartamento.component.html',
  styleUrls: ['./listardepartamento.component.scss']
})
export class ListarDepartamentoComponent implements OnInit{
  departamento: idepartamento[]=[]; 
   
  form = new FormGroup({ 
    id: new FormControl(),
    nome: new FormControl(''),
    localidade: new FormControl(''),
    descricaoAtividades: new FormControl(''),
    email: new FormControl(''),
  }) 
 
  constructor( 
    private service: DepartamentoService,  
    private router: Router,  
    private route: ActivatedRoute){ } 
 
  ngOnInit(): void { 
     this.Listar(); 
  } 
 
  Listar(){ 
     this.service.listar().subscribe(dados => this.departamento = dados); 
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
          this.service.listar().subscribe(dados => this.departamento = dados); 
        }, 
      );
      this.form.reset()
      this.router.navigate(['departamento']);
    })
  } 
}
