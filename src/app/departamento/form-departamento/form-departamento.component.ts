import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DepartamentoService } from '../service/departamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { idepartamento } from '../service/idepartamento';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-departamento',
  templateUrl: './form-departamento.component.html',
  styleUrls: ['./form-departamento.component.scss']
})
export class FormDepartamentoComponent implements OnInit{
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    localidade: new FormControl(''),
    descricaoAtividades: new FormControl(''),
    email: new FormControl(''),
  })
  
  constructor( 
    private service:DepartamentoService, 
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
            this.router.navigate(['departamento']); 
          }) 
        }, 
        Error => {
          Swal.fire({
            title: "Erro",
            text: "Erro ao atualizar cadastro!",
            icon: "error"
          }).then((result) => {
            this.form.reset()
            this.router.navigate(['departamento']); 
          })
        }
      ); 
    } 
    else{  
      this.service.criar(this.form.value).subscribe( 
        success => { 
          Swal.fire({
            title: "Salvar",
            text: "Departamento cadastrado com sucesso!",
            icon: "success"
          }).then((result) => {
            this.form.reset()
            this.router.navigate(['departamento']); 
          }) 
        }, 
        Error => {
          Swal.fire({
            title: "Erro",
            text: "Erro no cadastro!",
            icon: "error"
          }).then((result) => {
            this.form.reset()
            this.router.navigate(['departamento']); 
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
    
    ).subscribe(departamento => this.atualizarForm(departamento)); 
  } 
  atualizarForm(departamento: idepartamento){ 
    this.form.patchValue({ 
      id: departamento.id, 
      nome:departamento.nome, 
      localidade:departamento.localidade,
      descricaoAtividades: departamento.descricaoAtividades,
      email:departamento.email,
    }); 
  } 
  Cancelar() {
    Swal.fire({
      title: "Cancelar",
      text: "Sua ação foi cancelada",
      icon: "error"
    }).then((result) => {
      this.form.reset()
      this.router.navigate(['departamento']); 
    })
  }    
}