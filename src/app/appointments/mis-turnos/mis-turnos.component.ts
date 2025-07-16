import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnoService } from '../../core/services/turno.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
  imports: [CommonModule, RouterModule]
})

export class MisTurnosComponent {
  turnos: any[] = [];

  constructor(private turnoService: TurnoService) {
    this.cargarMisTurnos();
  }

  cargarMisTurnos() {
    this.turnoService.getMisTurnos().subscribe(turnos => {
      this.turnos = turnos;
    });
  }

  cancelar(id: number) {
    this.turnoService.cancelarTurno(id).subscribe({
      next: () => {
        alert('Turno cancelado');
        this.cargarMisTurnos();
      },
      error: (err) => {
        if (err.status === 400) {
          alert(err.error.message || 'No se pudo cancelar el turno');
        } else {
          alert('Ocurrió un error al cancelar el turno');
        }
      }
    });
  }
}

