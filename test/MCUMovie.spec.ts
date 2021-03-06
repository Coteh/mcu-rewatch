import Vue from "vue";
import { shallowMount, Wrapper } from "@vue/test-utils";
import { expect } from "chai";
import { SinonMock, mock } from "sinon";
import MCUMovie from "../site/components/MCUMovie.vue";
import MovieSeries from "../site/lib/MovieSeries";

describe("MCUMovie", () => {
    let wrapper: Wrapper<MCUMovie>;

    beforeEach(() => {
        wrapper = shallowMount(MCUMovie);
    });

    it("has a containing div", () => {
        expect(wrapper.element.nodeName).to.equal("DIV");
    });

    it("should have an img tag", () => {
        expect(wrapper.contains("img")).to.be.true;
    });

    it("should have the 'movie' class", () => {
        let imgElem: Wrapper<Vue> = wrapper.find("img");

        expect(imgElem.classes()).to.contain("movie");
    });

    it("should have 'grayscale' class if movie not yet watched", async () => {
        wrapper.setData({
            watched: false
        });

        await Vue.nextTick();

        let imgElem: Wrapper<Vue> = wrapper.find("img");

        expect(imgElem.classes()).to.contain("grayscale");
    });

    it("should not have 'grayscale' class if movie has been watched", async () => {
        wrapper.setData({
            watched: true
        });

        await Vue.nextTick();

        let imgElem: Wrapper<Vue> = wrapper.find("img");

        expect(imgElem.classes()).to.not.contain("grayscale");
    });

    it("should appear if both loaded and available to show", async () => {
        wrapper.setData({
            loaded: true
        });
        wrapper.setProps({
            show: true
        });

        await Vue.nextTick();

        let imgElem: Wrapper<Vue> = wrapper.find("img");
        
        expect(imgElem.element.style.display).to.not.equal("none");
    });

    describe("toggleWatch", () => {
        const MOVIE_ID_FIXTURE: number = 5;

        let movieSeriesMock: SinonMock;

        beforeEach(() => {
            wrapper.setProps({
                movieModel: new MovieSeries("movie", [], {}, null),
                movieId: MOVIE_ID_FIXTURE
            });

            movieSeriesMock = mock(MovieSeries.prototype);
        });

        it("should toggle watched status from unwatched to watched", () => {
            movieSeriesMock.expects("saveWatchedStatus").once().withExactArgs(MOVIE_ID_FIXTURE, true);
            
            wrapper.setData({
                watched: false
            });
            
            wrapper.vm.toggleWatch();

            expect(wrapper.vm.watched).to.equal(true);
        });

        it("should toggle watched status from watched to unwatched", () => {
            movieSeriesMock.expects("saveWatchedStatus").once().withExactArgs(MOVIE_ID_FIXTURE, false);
            
            wrapper.setData({
                watched: true
            });
            
            wrapper.vm.toggleWatch();

            expect(wrapper.vm.watched).to.equal(false);
        });

        it("should throw an exception if watched status couldn't be saved to model", () => {
            movieSeriesMock.expects("saveWatchedStatus").once().throwsException(new Error("Bad stuff happens"));

            wrapper.setData({
                watched: false
            });

            try {
                wrapper.vm.toggleWatch();
                expect.fail();
            } catch (e) {
                movieSeriesMock.verify();
            }
        });

        it("should emit updated watched status event", async () => {
            movieSeriesMock.expects("saveWatchedStatus").once().withExactArgs(MOVIE_ID_FIXTURE, true);
            
            wrapper.setData({
                watched: false
            });
            
            wrapper.vm.toggleWatch();

            await wrapper.vm.$nextTick();

            expect(wrapper.emitted()["update-watched"]).to.be.ok;
            expect(wrapper.emitted()["update-watched"].length).to.be.equal(1);
            expect(wrapper.emitted()["update-watched"][0]).to.deep.equal([5, true]);
        });

        afterEach(() => {
            movieSeriesMock.restore();
        });
    });

});