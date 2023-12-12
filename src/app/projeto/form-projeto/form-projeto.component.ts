import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjetoService } from '../service/projeto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Iprojeto } from '../service/iprojeto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-projeto',
  templateUrl: './form-projeto.component.html',
  styleUrls: ['./form-projeto.component.scss']
})
export class FormProjetoComponent implements OnInit{
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    descricao: new FormControl(''),
    qtdeParticipantes: new FormControl(),
    responsavel: new FormControl(''),
    custo: new FormControl(),
  })
  
  constructor( 
    private service:ProjetoService, 
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
            this.router.navigate(['projeto']); 
          }) 
        }, 
        Error => {
          Swal.fire({
            title: "Erro",
            text: "Erro ao atualizar cadastro!",
            icon: "error"
          }).then((result) => {
            this.form.reset()
            this.router.navigate(['projeto']); 
          })
        }
      ); 
    } 
    else{  
      this.service.criar(this.form.value).subscribe( 
        success => { 
          Swal.fire({
            title: "Salvar",
            text: "Projeto cadastrado com sucesso!",
            icon: "success"
          }).then((result) => {
            this.form.reset()
            this.router.navigate(['projeto']); 
          }) 
        }, 
        Error => {
          Swal.fire({
            title: "Erro",
            text: "Erro no cadastro!",
            icon: "error"
          }).then((result) => {
            this.form.reset()
            this.router.navigate(['projeto']); 
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
    
    ).subscribe(projeto => this.atualizarForm(projeto)); 
  } 
  atualizarForm(projeto: Iprojeto){ 
    this.form.patchValue({ 
      id: projeto.id, 
      nome:projeto.nome, 
      descricao:projeto.descricao,
      qtdeParticipantes:projeto.qtdeParticipantes,
      responsavel:projeto.responsavel,
      custo:projeto.custo,
    }); 
  } 
  Cancelar() {
    Swal.fire({
      title: "Cancelar",
      text: "Sua ação foi cancelada",
      icon: "error"
    }).then((result) => {
      this.form.reset()
      this.router.navigate(['projeto']); 
    })
  }    
}
