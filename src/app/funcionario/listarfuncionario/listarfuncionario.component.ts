import { Component, OnInit } from '@angular/core';
import { IFuncionario } from '../service/ifuncionario' 
import { FuncionarioService } from '../service/funcionario.service'; 
import { ActivatedRoute, Router} from '@angular/router'; 
import { FormControl, FormGroup } from '@angular/forms'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listarfuncionario',
  templateUrl: './listarfuncionario.component.html',
  styleUrls: ['./listarfuncionario.component.scss']
})
export class ListarFuncionarioComponent implements OnInit{
  funcionario: IFuncionario[]=[]; 
   
  form = new FormGroup({ 
    id: new FormControl(),
    nome: new FormControl(''),
    cargo: new FormControl(''),
    salario: new FormControl(),
    areaAtuacao: new FormControl(''),
    localTrabalho: new FormControl(''),
  }) 
 
  constructor( 
    private service: FuncionarioService,  
    private router: Router,  
    private route: ActivatedRoute){ } 
 
  ngOnInit(): void { 
     this.Listar(); 
  } 
 
  Listar(){ 
     this.service.listar().subscribe(dados => this.funcionario = dados); 
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
          this.service.listar().subscribe(dados => this.funcionario = dados); 
        }, 
      );
      this.form.reset()
      this.router.navigate(['funcionario']);
    })
  } 
}
