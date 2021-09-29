import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { COURSES } from "../../../../server/db-data";

describe("CoursesService", () => {
  let coursesService: CoursesService;
  let httpTestingControlller: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService
      ]
    });

    coursesService = TestBed.inject(CoursesService);
    httpTestingControlller = TestBed.inject(HttpTestingController);
  });
  
  it('should retrieve all courses', () => {
    coursesService.findAllCourses()
      .subscribe(courses => {
        expect(courses).toBeTruthy('No courses returned');
        expect(courses.length).toBe(12,"incorrect number of courses");

        const course = courses.find(c => c.id == 12);

        expect(course.titles.description).toBe("Angular Testing Course");
      });

      const req = httpTestingControlller.expectOne('/api/courses');

      expect(req.request.method).toEqual("GET");

      // flush serve para determinar os valores de retorno do metodo
      // de uma requisicao http, serve tanto para retornos com ou sem erros
      req.flush({payload: Object.values(COURSES)});
  });
})