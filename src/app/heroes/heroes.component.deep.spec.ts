import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Input, Component } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe('HeroesComponent (deep tests)', () => {

    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 2, name: 'Women', strength: 24 },
            { id: 3, name: 'SpiderDude', strength: 55 }
        ]
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            //when cannot recognize router, or child components
            schemas: [NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroesComponent);
        // when the error is cannout subscribe to undefined
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();
    });

    it('should render each hero as HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES))

        // run ngOnInit
        fixture.detectChanges();

        const heroCmponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent))

        expect(heroCmponentDEs.length).toEqual(3);

        for (let i = 0; i < heroCmponentDEs.length; i++) {
            expect(heroCmponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }

    });


})