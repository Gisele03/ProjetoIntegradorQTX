import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientesService } from '../service/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Iclientes } from '../service/iclientes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.scss']
})
export class FormClientesComponent implements OnInit{
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    cpf: new FormControl(''),
    rg: new FormControl(''),
    endereco: new FormControl(''),
    email: new FormControl(''),
  })
  
  constructor( 
    private service:ClientesService, 
    private route:ActivatedRoute, 
    private router: Router 
  ){ } 

  ngOnInit(){ this.ListarPorId(); } 
    
  Salvar() { 
    if(this.form.value.id){ 
      this.service.atualizar(this.form.value).subscribe( 
        success => { 
          Swal.fire({
            title: "Salvar",
            text: "Cadastro atualizado com sucesso!",
            icon: "success"
          }).then((result) => {
            this.form.reset()
            this.router.navigate(['clientes']); 
          }) 
        }, 
        Error => {
          Swal.fire({
            title: "Erro",
            text: "Erro ao atualizar cadastro!",
            icon: "error"
          }).then((result) => {
            this.form.reset()
            this.router.navigate(['clientes']); 
          })
        }
      ); 
    } 
    else{  
      this.service.criar(this.form.value).subscribe( 
        success => { 
          Swal.fire({
            title: "Salvar",
            text: "Cliente cadastrado com sucesso!",
            icon: "success"
          }).then((result) => {
            this.form.reset()
            this.router.navigate(['clientes']); 
          }) 
        }, 
        Error => {
          Swal.fire({
            title: "Erro",
            text: "Erro no cadastro!",
            icon: "error"
          }).then((result) => {
            this.form.reset()
            this.router.navigate(['clientes']); 
          })
        }
      ); 
    } 
    this.form.reset();     
  } 
  ListarPorId(){ 
    this.route.params 
    .pipe( 
      map((params: any) => params['id']), 
      switchMap(id => this.service.listarPorId(id)) 
    
    ).subscribe(cliente => this.atualizarForm(cliente)); 
  } 
  atualizarForm(cliente: Iclientes){ 
    this.form.patchValue({ 
      id: cliente.id, 
      nome:cliente.nome, 
      cpf:cliente.cpf,
      rg:cliente.rg,
      endereco:cliente.endereco,
      email:cliente.email,
    }); 
  } 
  Cancelar() {
    Swal.fire({
      title: "Cancelar",
      text: "Sua ação foi cancelada",
      icon: "error"
    }).then((result) => {
      this.form.reset()
      this.router.navigate(['clientes']); 
    })
  }    
}
