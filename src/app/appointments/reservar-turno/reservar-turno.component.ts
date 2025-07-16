import { Component } from '@angular/core';
import { TurnoService } from '../../core/services/turno.service';
import { Appointment } from '../appointment.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { format, parse, subHours } from 'date-fns';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-reservar-turno',
  standalone: true,
  templateUrl: './reservar-turno.component.html',
  styleUrls: ['./reservar-turno.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule],
})

export class ReservarTurnoComponent {
  fechaSeleccionada = format(new Date(), 'yyyy-MM-dd');
  minDate = format(new Date(), 'yyyy-MM-dd');
  turnos: Appointment[] = [];

  constructor(private turnoService: TurnoService) {
    this.cargarTurnos();
  }

  puedeReservar(hora: string): boolean {
  const turnoDateTime = parse(
    `${this.fechaSeleccionada} ${hora}`,
    'yyyy-MM-dd HH:mm',
    new Date()
  );

  const unaHoraAntes = subHours(turnoDateTime, 1);
  return new Date() < unaHoraAntes;
}


  cargarTurnos() {
    this.turnoService.getDisponibles(this.fechaSeleccionada).subscribe((turnos: Appointment[]) => {
      this.turnos = turnos;
    });
  }

  reservar(time: string) {
    this.turnoService.reservarTurno(this.fechaSeleccionada, time).subscribe(() => {
      alert('Turno reservado');
      this.cargarTurnos();
    });
  }
}

