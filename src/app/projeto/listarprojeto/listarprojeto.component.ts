import { Component, OnInit } from '@angular/core';
import { Iprojeto } from '../service/iprojeto' 
import { ProjetoService } from '../service/projeto.service'; 
import { ActivatedRoute, Router} from '@angular/router'; 
import { FormControl, FormGroup } from '@angular/forms'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listarprojeto',
  templateUrl: './listarprojeto.component.html',
  styleUrls: ['./listarprojeto.component.scss']
})
export class ListarprojetoComponent implements OnInit{
  projeto: Iprojeto[]=[]; 
   
  form = new FormGroup({ 
    id: new FormControl(),
    nome: new FormControl(''),
    descricao: new FormControl(''),
    qtdeParticipantes: new FormControl(),
    responsavel: new FormControl(''),
    custo: new FormControl(),
  }) 
 
  constructor( 
    private service: ProjetoService,  
    private router: Router,  
    private route: ActivatedRoute){ } 
 
  ngOnInit(): void { 
     this.Listar(); 
  } 
 
  Listar(){ 
     this.service.listar().subscribe(dados => this.projeto = dados); 
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
          this.service.listar().subscribe(dados => this.projeto = dados); 
        }, 
      );
      this.form.reset()
      this.router.navigate(['projeto']);
    })
  } 
}