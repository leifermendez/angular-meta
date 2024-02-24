import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private _download$ = new BehaviorSubject(false)
  download$ = this._download$.asObservable()

  private _loading$ = new BehaviorSubject(false)
  loading$ = this._loading$.asObservable()

  private _whisper$ = new BehaviorSubject(false)
  whisper$ = this._whisper$.asObservable()

  private _eventLab$ = new BehaviorSubject(false)
  eventLab$ = this._eventLab$.asObservable()

  private _url$ = new BehaviorSubject<string>('')
  url$ = this._url$.asObservable()

  private _video$ = new BehaviorSubject<{title:string, description:string}>({title:'', description:''})
  video$ = this._video$.asObservable()

  private _text$ = new BehaviorSubject<string>('<h1>¿Cómo la oposición a la guerra afecta a los estudiantes en Rusia?</h1>\n\n<p>André Cotenco, un estudiante de periodismo en San Petersburgo, fue expulsado de la universidad por expresar su oposición a la guerra y publicar imágenes antibélicas en sus redes sociales. A pesar de tener buenas notas, la rectoría hizo todo lo posible para hacerle la vida imposible y finalmente expulsarlo. Esta situación no solo afectó su carrera universitaria sino también su vida personal.</p>[IMAGE]\n\n<h2>La realidad de los estudiantes en Rusia</h2>\n\n<p>En Rusia, el reclutamiento de soldados está aumentando, especialmente en regiones apartadas como Novosibirsk. En escuelas técnicas superiores y universidades, se exhorta a los estudiantes a unirse al ejército y se publican afiches de propaganda en sus páginas web. Esto ha generado controversia y críticas por parte de los estudiantes y directores de las instituciones educativas.</p>\n\n<h2>El impacto en la libertad de expresión</h2>\n\n<p>La oposición a la guerra y las opiniones políticas pueden tener consecuencias graves para los estudiantes en Rusia. Andre Cotenco es solo un ejemplo de cómo la libertad de expresión es limitada y cómo las opiniones políticas pueden ser motivo de expulsión de la universidad. En este estado, cada vez se silencia más a quienes se oponen a la guerra y se recluta a más soldados.</p>\n\n<h2>El caso de Andre Cotenco</h2>\n\n<p>A pesar de la expulsión de la universidad, Andre Cotenco demandó a la universidad exigiendo la devolución de las cuotas pagadas y una indemnización. En parte, el tribunal le dio la razón y la universidad tuvo que devolverle las cuotas y pagarle una indemnización. Sin embargo, Cotenco es escéptico sobre sus perspectivas profesionales después de lo sucedido.</p>\n\n<h3>Conclusión</h3>\n\n<p>La situación en Rusia muestra cómo la oposición a la guerra y las opiniones políticas pueden tener consecuencias graves para los estudiantes, limitando su libertad de expresión y afectando sus perspectivas profesionales. Es importante seguir luchando por la libertad de expresión y la paz en todo el mundo.</p>')
  text$ = this._text$.asObservable()

  constructor(private http:HttpClient) { }
  
  getId(){
    const id = this._url$.getValue().split('v=').pop()
    return id
  }

  download(){
    const id = this.getId()
    this._loading$.next(true)
      return this.http.get(`/api/v1/video/${id}`).pipe(
        finalize(() => this._loading$.next(false)),
        tap((value:any) => this._video$.next({title:value.info.title, description:value.info.description}))
      )
  }

  whisper(){
    const id = this.getId()
    this._loading$.next(true)
      return this.http.get(`/api/v1/whisper/${id}`).pipe(
        finalize(() => this._loading$.next(false)),
        tap((data:any) => this._text$.next(data.text)),
        tap((data:any) => console.log(data.text))
        )
  }

  url(text:string){
    this._url$.next(text)
  }
}
