/* =========================================================
   NEXUS RTX 7600 XT
   MULTIPAGE.JS
   Menu mobile + animações das páginas
========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MENU MOBILE
    ====================================================== */

    const menuBtn = document.querySelector("#menuBtn");
    const mainNav = document.querySelector("#mainNav");

    if (menuBtn && mainNav) {

        menuBtn.addEventListener("click", () => {

            const isOpen =
                mainNav.classList.toggle("open");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuBtn.textContent =
                isOpen ? "✕" : "☰";

        });


        const navLinks =
            mainNav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.textContent = "☰";

            });

        });

    }



    /* =====================================================
       FECHAR MENU AO REDIMENSIONAR
    ====================================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 900 &&
            mainNav
        ) {

            mainNav.classList.remove("open");

            if (menuBtn) {

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.textContent = "☰";

            }

        }

    });



    /* =====================================================
       ANIMAÇÃO AO ROLAR
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".mp-reveal");


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "mp-visible"
                                );

                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    });

                },

                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -50px 0px"
                }

            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    }

    else {

        revealElements.forEach(
            element => {

                element
                    .classList
                    .add(
                        "mp-visible"
                    );

            }
        );

    }



    /* =====================================================
       HEADER AO ROLAR
    ====================================================== */

    const header =
        document.querySelector("#header");


    function updateHeader() {

        if (!header) {
            return;
        }


        if (
            window.scrollY > 30
        ) {

            header.style.background =
                "rgba(3, 3, 3, .92)";

            header.style.boxShadow =
                "0 10px 40px rgba(0,0,0,.35)";

        }

        else {

            header.style.background =
                "rgba(3, 3, 3, .78)";

            header.style.boxShadow =
                "none";

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();



    /* =====================================================
       ANIMAÇÃO DOS KPIs
    ====================================================== */

    const kpis =
        document.querySelectorAll(
            ".mp-kpi-strip > div"
        );


    if (
        kpis.length &&
        "IntersectionObserver" in window
    ) {

        const kpiObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const items =
                                entry.target
                                    .querySelectorAll(
                                        ":scope > div"
                                    );


                            items.forEach(
                                (item, index) => {

                                    item.style.opacity =
                                        "0";

                                    item.style.transform =
                                        "translateY(20px)";


                                    setTimeout(
                                        () => {

                                            item.style.transition =
                                                `
                                                    opacity .6s ease,
                                                    transform .6s
                                                    cubic-bezier(.16,1,.3,1)
                                                `;

                                            item.style.opacity =
                                                "1";

                                            item.style.transform =
                                                "translateY(0)";

                                        },

                                        index * 100
                                    );

                                }
                            );


                            kpiObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    });

                },

                {
                    threshold: .2
                }

            );


        const kpiStrip =
            document.querySelector(
                ".mp-kpi-strip"
            );


        if (kpiStrip) {

            kpiObserver.observe(
                kpiStrip
            );

        }

    }



    /* =====================================================
       CARDS COM LEVE EFEITO DE MOUSE
    ====================================================== */

    const interactiveCards =
        document.querySelectorAll(
            `
            .mp-route-card,
            .mp-strategy-card,
            .mp-fin-card,
            .mp-supply-card,
            .mp-marketing-card
            `
        );


    interactiveCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 900
                ) {

                    return;

                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (
                        y -
                        centerY
                    )
                    / 30;


                const rotateY =
                    (
                        centerX -
                        x
                    )
                    / 30;


                card.style.transform =
                    `
                        perspective(900px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-5px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });



    /* =====================================================
       DESTACAR AUTOMATICAMENTE A PÁGINA ATUAL
    ====================================================== */

    const currentPage =
        document.body.dataset.page;


    if (
        currentPage &&
        mainNav
    ) {

        const links =
            mainNav.querySelectorAll("a");


        links.forEach(link => {

            const href =
                link.getAttribute("href");


            if (!href) {
                return;
            }


            const normalized =
                href
                    .replace(".html", "")
                    .replace("./", "");


            const pageNormalized =
                currentPage
                    .replace(".html", "");


            if (
                normalized ===
                pageNormalized
            ) {

                link
                    .classList
                    .add(
                        "active"
                    );

            }

        });

    }



    /* =====================================================
       LINKS INTERNOS SUAVES
    ====================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

            }
        );

    });



    /* =====================================================
       BARRAS FINANCEIRAS
    ====================================================== */

    const financialBars =
        document.querySelectorAll(
            ".profit .bar-fill"
        );


    if (
        financialBars.length &&
        "IntersectionObserver" in window
    ) {

        financialBars.forEach(bar => {

            const finalWidth =
                bar.style.width ||
                getComputedStyle(bar).width;


            if (
                bar.style.width
            ) {

                bar.dataset.finalWidth =
                    bar.style.width;

                bar.style.width =
                    "0%";

            }

        });


        const profitSection =
            document.querySelector(
                ".profit"
            );


        if (profitSection) {

            const barObserver =
                new IntersectionObserver(

                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    !entry
                                        .isIntersecting
                                ) {

                                    return;

                                }


                                financialBars
                                    .forEach(
                                        (
                                            bar,
                                            index
                                        ) => {

                                            setTimeout(
                                                () => {

                                                    if (
                                                        bar.dataset
                                                            .finalWidth
                                                    ) {

                                                        bar.style.width =
                                                            bar.dataset
                                                                .finalWidth;

                                                    }

                                                },

                                                index *
                                                180

                                            );

                                        }
                                    );


                                barObserver
                                    .disconnect();

                            }
                        );

                    },

                    {
                        threshold: .2
                    }

                );


            barObserver.observe(
                profitSection
            );

        }

    }



    /* =====================================================
       PARALLAX LEVE DO HERO
    ====================================================== */

    const pageHero =
        document.querySelector(
            ".mp-page-hero"
        );


    const pageOrb =
        document.querySelector(
            ".mp-page-orb"
        );


    if (
        pageHero &&
        pageOrb &&
        window.innerWidth > 900
    ) {

        pageHero.addEventListener(
            "mousemove",
            event => {

                const rect =
                    pageHero
                        .getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    )
                    /
                    rect.width;


                const y =
                    (
                        event.clientY -
                        rect.top
                    )
                    /
                    rect.height;


                const moveX =
                    (
                        x -
                        .5
                    )
                    *
                    25;


                const moveY =
                    (
                        y -
                        .5
                    )
                    *
                    25;


                pageOrb.style.transform =
                    `
                        translateY(-50%)
                        translate(
                            ${moveX}px,
                            ${moveY}px
                        )
                    `;

            }
        );


        pageHero.addEventListener(
            "mouseleave",
            () => {

                pageOrb.style.transform =
                    "translateY(-50%)";

            }
        );

    }



    /* =====================================================
       CONSOLE
    ====================================================== */

    console.log(
        "%cNEXUS RTX 7600 XT",
        `
        color:#ff2020;
        font-size:20px;
        font-weight:bold;
        `
    );


    console.log(
        "Multi-page system online."
    );

});