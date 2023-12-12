import { Component, OnInit } from '@angular/core';
import { IEmpresa } from '../service/iempresa' 
import { EmpresaService } from '../service/empresa.service'; 
import { ActivatedRoute, Router} from '@angular/router'; 
import { FormControl, FormGroup } from '@angular/forms'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listarempresa',
  templateUrl: './listarempresa.component.html',
  styleUrls: ['./listarempresa.component.scss']
})
export class ListarEmpresaComponent implements OnInit{
  empresa: IEmpresa[]=[]; 
   
  form = new FormGroup({ 
    id: new FormControl(),
    nome: new FormControl(''),
    cnpj: new FormControl(''),
    endereco: new FormControl(''),
    socios: new FormControl(''),
    faturamento: new FormControl(''),
  }) 
 
  constructor( 
    private service: EmpresaService,  
    private router: Router,  
    private route: ActivatedRoute){ } 
 
  ngOnInit(): void { 
     this.Listar(); 
  } 
 
  Listar(){ 
     this.service.listar().subscribe(dados => this.empresa = dados); 
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
          this.service.listar().subscribe(dados => this.empresa = dados); 
        }, 
      );
      this.form.reset()
      this.router.navigate(['empresa']);
    })
  } 
}
