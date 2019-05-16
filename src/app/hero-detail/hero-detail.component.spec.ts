import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from '@angular/common';
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";



describe('HeroDetailComponent', () => {
    let mockActivatedRoute, mockHeroService, mockLocation;
    let fixture: ComponentFixture<HeroDetailComponent>;
    beforeEach(() => {

        mockActivatedRoute = {
            snapshot: { paramMap: { get: () => { return '3'; } } }
        }
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HeroDetailComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: HeroService, useValue: mockHeroService },
                { provide: Location, useValue: mockLocation }
            ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);

        mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'SuperDude', strength: 100 }));
    });
    it('should render the hero name in h2 tag', () => {

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
    })

    //it('should call updateHero when save is called', (done) => {
        it('should call updateHero when save is called', fakeAsync (() => {

        
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();

        // setTimeout(() => {
        //     expect(mockHeroService.updateHero).toHaveBeenCalled();
        //     done();
        // }, 250)
        //tick(300);
        flush();
        expect(mockHeroService.updateHero).toHaveBeenCalled();
    }))

    // it('should call updateHero when save is called 1', async(()=>{
    //     // rely on zone.js
    //     // async works only with promises
    //     mockHeroService.updateHero.and.returnValue(of({}));
    //     fixture.detectChanges();
    
    //     fixture.componentInstance.save();

    //     fixture.whenStable().then(()=>{
    //         expect(mockHeroService.updateHero).toHaveBeenCalled();
    //     });
        
    // }))
})