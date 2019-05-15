import { TestBed, inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('HeroService', () => {

    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let service: HeroService;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageService }
            ]
        });
        httpTestingController = TestBed.get(HttpTestingController);
        // TestBed.get is a way to have instance of service in test
        service = TestBed.get(HeroService);

    })

    describe('getHero', () => {

        it('should call get with the correct URL', () => {

            // ,
            //     inject([HeroService, HttpTestingController],
            //         (service: HeroService, controller: HttpTestingController) => {

            //             service.getHero(4).subscribe();
            //         })

            service.getHero(4).subscribe();
            //service.getHero(3).subscribe();

           const req= httpTestingController.expectOne('api/heroes/4');
           req.flush({id : 4, name:'SuperDude',strength:3})
           httpTestingController.verify();

        });
    })
});