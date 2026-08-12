/* =====================================================
   GPU DESMONTANDO CONFORME O SCROLL
===================================================== */

const gpuScrollSection =
    document.querySelector(".gpu-scroll-section");

const gpuScrollImage =
    document.querySelector("#gpuScrollImage");

const gpuProgressFill =
    document.querySelector("#gpuProgressFill");

const gpuProgressPoint =
    document.querySelector("#gpuProgressPoint");

const gpuProgressText =
    document.querySelector("#gpuProgressText");

const gpuStageNumber =
    document.querySelector("#gpuStageNumber");

const gpuStageTitle =
    document.querySelector("#gpuStageTitle");

const gpuStageDescription =
    document.querySelector("#gpuStageDescription");


const gpuFrames = [

    "gpu-01.png",

    "gpu-02.png",

    "gpu-03.png",

    "gpu-04.png",

    "gpu-05.png"

];


const gpuStages = [

    {
        number: "01 / 05",

        title: "ESTRUTURA COMPLETA",

        description:
            "A NEXUS RTX 7800 X em sua forma completamente montada."
    },

    {
        number: "02 / 05",

        title: "SISTEMA DE REFRIGERAÇÃO",

        description:
            "A estrutura externa começa a se separar, revelando as ventoinhas e o dissipador."
    },

    {
        number: "03 / 05",

        title: "DISSIPADOR E HEATPIPES",

        description:
            "O sistema térmico se afasta da placa e revela os heatpipes de cobre responsáveis pela transferência de calor."
    },

    {
        number: "04 / 05",

        title: "PCB E MEMÓRIAS",

        description:
            "A PCB, os módulos GDDR6 e o circuito de alimentação ficam totalmente visíveis."
    },

    {
        number: "05 / 05",

        title: "NEXUS FUSION CORE",

        description:
            "A placa está completamente desmontada, mostrando toda a arquitetura interna da NEXUS RTX 7800 X."
    }

];


/* =====================================================
   PRÉ-CARREGAR AS IMAGENS
===================================================== */

gpuFrames.forEach(source => {

    const image =
        new Image();

    image.src =
        source;

});


let currentGPUFrame =
    -1;


/* =====================================================
   ATUALIZAR GPU PELO SCROLL
===================================================== */

function updateGPUScroll() {

    if (
        !gpuScrollSection ||
        !gpuScrollImage
    ) {

        return;

    }


    const rect =
        gpuScrollSection.getBoundingClientRect();


    const scrollableHeight =
        gpuScrollSection.offsetHeight -
        window.innerHeight;


    if (scrollableHeight <= 0) {

        return;

    }


    let progress =
        -rect.top /
        scrollableHeight;


    progress =
        Math.max(
            0,
            Math.min(
                1,
                progress
            )
        );


    /* =========================================
       PORCENTAGEM
    ========================================= */

    const percentage =
        Math.round(
            progress * 100
        );


    if (gpuProgressFill) {

        gpuProgressFill.style.width =
            percentage + "%";

    }


    if (gpuProgressPoint) {

        gpuProgressPoint.style.left =
            percentage + "%";

    }


    if (gpuProgressText) {

        gpuProgressText.textContent =
            percentage + "%";

    }


    /* =========================================
       FRAME DA GPU
    ========================================= */

    const frameIndex =
        Math.min(

            gpuFrames.length - 1,

            Math.floor(
                progress *
                gpuFrames.length
            )

        );


    if (
        frameIndex !==
        currentGPUFrame
    ) {

        currentGPUFrame =
            frameIndex;


        gpuScrollImage.style.opacity =
            ".30";


        gpuScrollImage.style.transform =
            "scale(.97)";


        const nextFrame =
            gpuFrames[
                frameIndex
            ];


        const preload =
            new Image();


        preload.onload =
            () => {

                gpuScrollImage.src =
                    nextFrame;


                gpuScrollImage.style.opacity =
                    "1";


                gpuScrollImage.style.transform =
                    "scale(1)";

            };


        preload.onerror =
            () => {

                /*
                    SE A IMAGEM gpu-XX.png
                    AINDA NÃO EXISTIR,
                    USA image.png
                */

                gpuScrollImage.src =
                    "image.png";


                gpuScrollImage.style.opacity =
                    "1";


                gpuScrollImage.style.transform =
                    "scale(1)";

            };


        preload.src =
            nextFrame;


        /* =====================================
           TEXTO DA ETAPA
        ===================================== */

        const stage =
            gpuStages[
                frameIndex
            ];


        if (gpuStageNumber) {

            gpuStageNumber.textContent =
                stage.number;

        }


        if (gpuStageTitle) {

            gpuStageTitle.textContent =
                stage.title;

        }


        if (gpuStageDescription) {

            gpuStageDescription.style.opacity =
                "0";


            setTimeout(
                () => {

                    gpuStageDescription.textContent =
                        stage.description;


                    gpuStageDescription.style.opacity =
                        "1";

                },

                120
            );

        }

    }


    /* =========================================
       MOVIMENTO LEVE
    ========================================= */

    const movement =
        (progress - .5) * 25;


    gpuScrollImage.style.marginTop =
        movement + "px";

}


/* =====================================================
   TRANSIÇÕES
===================================================== */

if (gpuScrollImage) {

    gpuScrollImage.style.transition =
        `
        opacity .20s ease,
        transform .25s cubic-bezier(.16,1,.3,1),
        margin-top .15s linear
        `;

}


if (gpuStageDescription) {

    gpuStageDescription.style.transition =
        "opacity .20s ease";

}


/* =====================================================
   EVENTOS
===================================================== */

window.addEventListener(
    "scroll",
    updateGPUScroll,
    {
        passive: true
    }
);


window.addEventListener(
    "resize",
    updateGPUScroll
);


updateGPUScroll();
/* =====================================================
   COMPARADOR INTERATIVO DE GPU
   MOUSE + CELULAR
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const comparison =
            document.querySelector(
                "#imageComparison"
            );


        const weakWrapper =
            document.querySelector(
                "#weakWrapper"
            );


        const slider =
            document.querySelector(
                "#compareSlider"
            );


        const weakImage =
            comparison
                ? comparison.querySelector(
                    ".compare-weak"
                )
                : null;


        if (
            !comparison ||
            !weakWrapper ||
            !slider
        ) {

            return;

        }


        let isDragging =
            false;


        /* =========================================
           MESMO TAMANHO DAS DUAS IMAGENS
        ========================================= */

        function syncWeakImageSize() {

            if (!weakImage) {

                return;

            }


            weakImage.style.width =
                comparison.clientWidth +
                "px";


            weakImage.style.height =
                comparison.clientHeight +
                "px";


            weakImage.style.maxWidth =
                "none";

        }


        /* =========================================
           MOVER BARRA
        ========================================= */

        function updateSlider(
            clientX
        ) {

            const rect =
                comparison
                    .getBoundingClientRect();


            let x =
                clientX -
                rect.left;


            x =
                Math.max(
                    0,
                    Math.min(
                        rect.width,
                        x
                    )
                );


            const percent =
                (
                    x /
                    rect.width
                ) * 100;


            weakWrapper.style.width =
                percent +
                "%";


            slider.style.left =
                percent +
                "%";

        }


        /* =========================================
           COMEÇAR A ARRASTAR
        ========================================= */

        comparison.addEventListener(
            "pointerdown",
            event => {

                isDragging =
                    true;


                comparison
                    .setPointerCapture?.(
                        event.pointerId
                    );


                updateSlider(
                    event.clientX
                );

            }
        );


        /* =========================================
           MOVENDO
        ========================================= */

        comparison.addEventListener(
            "pointermove",
            event => {

                if (
                    !isDragging
                ) {

                    return;

                }


                updateSlider(
                    event.clientX
                );

            }
        );


        /* =========================================
           SOLTOU
        ========================================= */

        comparison.addEventListener(
            "pointerup",
            event => {

                isDragging =
                    false;


                comparison
                    .releasePointerCapture?.(
                        event.pointerId
                    );

            }
        );


        comparison.addEventListener(
            "pointercancel",
            () => {

                isDragging =
                    false;

            }
        );


        /* =========================================
           CLICAR EM QUALQUER LOCAL
        ========================================= */

        comparison.addEventListener(
            "click",
            event => {

                updateSlider(
                    event.clientX
                );

            }
        );


        /* =========================================
           RESPONSIVIDADE
        ========================================= */

        window.addEventListener(
            "resize",
            syncWeakImageSize
        );


        syncWeakImageSize();


        /* COMEÇA NO MEIO */

        weakWrapper.style.width =
            "50%";


        slider.style.left =
            "50%";

    }
);/* =========================================================
   NEXUS EXPERIENCE
   RECURSOS EXTRAS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           GPU - TRANSIÇÃO SUAVE
        ===================================================== */

        const nxGpuSection =
            document.querySelector(
                ".gpu-scroll-section"
            );


        const nxOriginalGpu =
            document.querySelector(
                "#gpuScrollImage"
            );


        if (
            nxGpuSection &&
            nxOriginalGpu
        ) {


            const nxGpuVisual =
                nxOriginalGpu.parentElement;


            const nxFrameA =
                document.createElement(
                    "img"
                );


            const nxFrameB =
                document.createElement(
                    "img"
                );


            nxFrameA.className =
                "gpu-smooth-frame gpu-smooth-a";


            nxFrameB.className =
                "gpu-smooth-frame gpu-smooth-b";


            nxFrameA.src =
                "gpu-01.png";


            nxFrameB.src =
                "gpu-02.png";


            nxFrameA.draggable =
                false;


            nxFrameB.draggable =
                false;


            nxFrameA.alt =
                "NEXUS RTX 7800 X";


            nxFrameB.alt =
                "NEXUS RTX 7800 X";


            nxGpuVisual.appendChild(
                nxFrameA
            );


            nxGpuVisual.appendChild(
                nxFrameB
            );


            nxOriginalGpu.classList.add(
                "gpu-original-hidden"
            );



            const nxFrames = [

                "gpu-01.png",

                "gpu-02.png",

                "gpu-03.png",

                "gpu-04.png",

                "gpu-05.png"

            ];



            nxFrames.forEach(
                source => {

                    const image =
                        new Image();


                    image.src =
                        source;

                }
            );



            let nxFrameRequest =
                false;



            function nxSmoothStep(
                value
            ) {

                return (

                    value *
                    value *
                    (
                        3 -
                        2 * value
                    )

                );

            }



            function nxUpdateGpu() {


                nxFrameRequest =
                    false;


                const rect =
                    nxGpuSection
                        .getBoundingClientRect();


                const total =
                    nxGpuSection
                        .offsetHeight -
                    window.innerHeight;


                if (
                    total <= 0
                ) {

                    return;

                }



                let progress =

                    -rect.top /
                    total;



                progress =

                    Math.max(

                        0,

                        Math.min(
                            1,
                            progress
                        )

                    );



                const framePosition =

                    progress *

                    (
                        nxFrames.length -
                        1
                    );



                const frameAIndex =

                    Math.floor(
                        framePosition
                    );



                const frameBIndex =

                    Math.min(

                        frameAIndex + 1,

                        nxFrames.length - 1

                    );



                let blend =

                    framePosition -
                    frameAIndex;



                blend =

                    nxSmoothStep(
                        blend
                    );



                const sourceA =

                    nxFrames[
                        frameAIndex
                    ];



                const sourceB =

                    nxFrames[
                        frameBIndex
                    ];



                if (
                    nxFrameA.dataset.src
                    !== sourceA
                ) {

                    nxFrameA.src =
                        sourceA;


                    nxFrameA.dataset.src =
                        sourceA;

                }



                if (
                    nxFrameB.dataset.src
                    !== sourceB
                ) {

                    nxFrameB.src =
                        sourceB;


                    nxFrameB.dataset.src =
                        sourceB;

                }



                nxFrameA.style.opacity =

                    1 -
                    blend;



                nxFrameB.style.opacity =

                    blend;



                const scaleA =

                    1 -
                    blend *
                    0.012;



                const scaleB =

                    .988 +
                    blend *
                    .012;



                nxFrameA.style.transform = `

                    translate(-50%, -50%)

                    scale(${scaleA})

                `;



                nxFrameB.style.transform = `

                    translate(-50%, -50%)

                    scale(${scaleB})

                `;

            }



            function nxRequestGpu() {


                if (
                    nxFrameRequest
                ) {

                    return;

                }


                nxFrameRequest =
                    true;


                requestAnimationFrame(
                    nxUpdateGpu
                );

            }



            window.addEventListener(

                "scroll",

                nxRequestGpu,

                {
                    passive: true
                }

            );



            window.addEventListener(

                "resize",

                nxRequestGpu

            );


            nxUpdateGpu();

        }



        /* =====================================================
           FUSION CORE
        ===================================================== */

        const fusionSection =
            document.querySelector(
                "#nexusFusion"
            );


        if (
            fusionSection
        ) {


            let fusionStarted =
                false;



            const fusionObserver =

                new IntersectionObserver(

                    entries => {


                        entries.forEach(

                            entry => {


                                if (
                                    entry.isIntersecting &&
                                    !fusionStarted
                                ) {


                                    fusionStarted =
                                        true;


                                    fusionSection
                                        .classList
                                        .add(
                                            "is-visible"
                                        );


                                    const counters =

                                        fusionSection
                                            .querySelectorAll(
                                                "[data-count]"
                                            );



                                    counters.forEach(

                                        counter => {

                                            nxAnimateCounter(
                                                counter
                                            );

                                        }

                                    );


                                    fusionObserver
                                        .disconnect();

                                }

                            }

                        );

                    },

                    {
                        threshold: .25
                    }

                );


            fusionObserver.observe(
                fusionSection
            );

        }



        function nxAnimateCounter(
            element
        ) {


            const destination =

                Number(
                    element.dataset.count
                );


            const decimals =

                Number(
                    element.dataset.decimals ||
                    0
                );


            const suffix =

                element.dataset.suffix ||
                "";


            const duration =
                1300;


            const start =
                performance.now();



            function update(
                time
            ) {


                const progress =

                    Math.min(

                        1,

                        (
                            time -
                            start
                        ) /
                        duration

                    );



                const smooth =

                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );



                const value =

                    destination *
                    smooth;



                element.textContent =

                    value
                        .toFixed(
                            decimals
                        )

                    +

                    suffix;



                if (
                    progress < 1
                ) {

                    requestAnimationFrame(
                        update
                    );

                }

            }


            requestAnimationFrame(
                update
            );

        }



        /* =====================================================
           NEXUS CONTROL
        ===================================================== */

        const control =
            document.querySelector(
                "#nexusControl"
            );


        if (
            control
        ) {


            const powerButton =
                control.querySelector(
                    "#nxPowerButton"
                );


            const statusText =
                control.querySelector(
                    "#nxStatusText"
                );


            const loadValue =
                control.querySelector(
                    "#nxLoadValue"
                );


            const tempValue =
                control.querySelector(
                    "#nxTempValue"
                );


            const clockValue =
                control.querySelector(
                    "#nxClockValue"
                );


            const memoryValue =
                control.querySelector(
                    "#nxMemoryValue"
                );


            const rpmValue =
                control.querySelector(
                    "#nxRpmValue"
                );


            const fpsValue =
                control.querySelector(
                    "#nxFpsValue"
                );


            const fanSlider =
                control.querySelector(
                    "#nxFanSlider"
                );


            const powerSlider =
                control.querySelector(
                    "#nxPowerSlider"
                );


            const fanSliderValue =
                control.querySelector(
                    "#nxFanSliderValue"
                );


            const powerSliderValue =
                control.querySelector(
                    "#nxPowerSliderValue"
                );


            const modeButtons =
                control.querySelectorAll(
                    ".nx-mode-btn"
                );


            const lightButtons =
                control.querySelectorAll(
                    ".nx-light-btn"
                );



            /* =============================================
               PERFIS
            ============================================== */

            const profiles = {


                silent: {

                    load: 72,

                    temp: 55,

                    clock: 2050,

                    fan: 38,

                    rpm: 1050,

                    fps: 116,

                    power: 78

                },


                balanced: {

                    load: 91,

                    temp: 64,

                    clock: 2400,

                    fan: 56,

                    rpm: 1840,

                    fps: 144,

                    power: 92

                },


                extreme: {

                    load: 99,

                    temp: 72,

                    clock: 2680,

                    fan: 82,

                    rpm: 2680,

                    fps: 171,

                    power: 110

                }

            };



            let currentMode =
                "balanced";


            let powered =
                false;


            let shownTemp =
                28;


            let targetTemp =
                28;



            function nxSetText(
                element,
                value
            ) {

                if (
                    element
                ) {

                    element.textContent =
                        value;

                }

            }



            function nxSetFanSpeed(
                percentage
            ) {


                const duration =

                    Math.max(

                        .22,

                        2.25 -
                        percentage *
                        .021

                    );


                control.style
                    .setProperty(

                        "--nx-fan-speed",

                        `${duration}s`

                    );

            }



            function nxApplyProfile(
                mode
            ) {


                const data =
                    profiles[mode];


                if (
                    !data
                ) {

                    return;

                }


                currentMode =
                    mode;



                modeButtons.forEach(

                    button => {

                        button.classList.toggle(

                            "active",

                            button.dataset.mode ===
                            mode

                        );

                    }

                );



                if (
                    fanSlider
                ) {

                    fanSlider.value =
                        data.fan;

                }



                if (
                    powerSlider
                ) {

                    powerSlider.value =
                        data.power;

                }



                nxSetText(

                    fanSliderValue,

                    `${data.fan}%`

                );


                nxSetText(

                    powerSliderValue,

                    `${data.power}%`

                );



                targetTemp =

                    powered
                    ?
                    data.temp
                    :
                    28;



                nxSetFanSpeed(
                    data.fan
                );



                nxRefreshControl();

            }



            function nxRefreshControl() {


                const data =
                    profiles[currentMode];


                if (
                    !powered
                ) {


                    nxSetText(
                        loadValue,
                        "0%"
                    );


                    nxSetText(
                        clockValue,
                        "0 MHz"
                    );


                    nxSetText(
                        memoryValue,
                        "--"
                    );


                    nxSetText(
                        rpmValue,
                        "0 RPM"
                    );


                    nxSetText(
                        fpsValue,
                        "-- FPS"
                    );


                    return;

                }



                nxSetText(

                    loadValue,

                    `${data.load}%`

                );


                nxSetText(

                    clockValue,

                    `${data.clock} MHz`

                );


                nxSetText(

                    memoryValue,

                    "16 GB"

                );


                nxSetText(

                    rpmValue,

                    `${data.rpm} RPM`

                );


                nxSetText(

                    fpsValue,

                    `${data.fps} FPS`

                );

            }



            /* =============================================
               POWER
            ============================================== */

            function nxSetPower(
                state
            ) {


                powered =
                    state;


                control.classList.toggle(

                    "is-powered",

                    powered

                );


                control.classList.toggle(

                    "is-off",

                    !powered

                );



                powerButton
                    ?.classList
                    .toggle(

                        "active",

                        powered

                    );



                const buttonText =

                    powerButton
                        ?.querySelector(
                            "span"
                        );


                nxSetText(

                    buttonText,

                    powered
                    ?
                    "POWER ON"
                    :
                    "POWER OFF"

                );


                nxSetText(

                    statusText,

                    powered
                    ?
                    "SYSTEM ONLINE"
                    :
                    "SYSTEM OFFLINE"

                );



                if (
                    powered
                ) {


                    targetTemp =

                        profiles[
                            currentMode
                        ].temp;


                    nxPlayStartupSound();

                }

                else {


                    targetTemp =
                        28;

                }


                nxRefreshControl();

            }



            powerButton
                ?.addEventListener(

                    "click",

                    () => {

                        nxSetPower(
                            !powered
                        );

                    }

                );



            /* =============================================
               MODOS
            ============================================== */

            modeButtons.forEach(

                button => {


                    button.addEventListener(

                        "click",

                        () => {


                            if (
                                !powered
                            ) {

                                nxSetPower(
                                    true
                                );

                            }


                            nxApplyProfile(

                                button.dataset.mode

                            );

                        }

                    );

                }

            );



            /* =============================================
               FAN SLIDER
            ============================================== */

            fanSlider
                ?.addEventListener(

                    "input",

                    () => {


                        if (
                            !powered
                        ) {

                            nxSetPower(
                                true
                            );

                        }


                        const value =

                            Number(
                                fanSlider.value
                            );


                        nxSetText(

                            fanSliderValue,

                            `${value}%`

                        );


                        nxSetFanSpeed(
                            value
                        );



                        const rpm =

                            Math.round(

                                500 +
                                value *
                                27

                            );


                        nxSetText(

                            rpmValue,

                            `${rpm} RPM`

                        );


                        targetTemp =

                            Math.max(

                                48,

                                profiles[
                                    currentMode
                                ].temp

                                -

                                (
                                    value -
                                    profiles[
                                        currentMode
                                    ].fan
                                )

                                *

                                .14

                            );

                    }

                );



            /* =============================================
               POWER LIMIT
            ============================================== */

            powerSlider
                ?.addEventListener(

                    "input",

                    () => {


                        if (
                            !powered
                        ) {

                            nxSetPower(
                                true
                            );

                        }


                        const value =

                            Number(
                                powerSlider.value
                            );


                        nxSetText(

                            powerSliderValue,

                            `${value}%`

                        );



                        const base =

                            profiles[
                                currentMode
                            ];



                        const factor =

                            value /
                            base.power;



                        const clock =

                            Math.round(

                                base.clock *
                                factor

                            );



                        const fps =

                            Math.round(

                                base.fps *

                                (
                                    .85 +
                                    factor *
                                    .15
                                )

                            );


                        nxSetText(

                            clockValue,

                            `${clock} MHz`

                        );


                        nxSetText(

                            fpsValue,

                            `${fps} FPS`

                        );


                        targetTemp =

                            Math.min(

                                79,

                                base.temp +

                                (
                                    value -
                                    base.power
                                )

                                *

                                .14

                            );

                    }

                );



            /* =============================================
               ILUMINAÇÃO
            ============================================== */

            lightButtons.forEach(

                button => {


                    button.addEventListener(

                        "click",

                        () => {


                            const color =

                                button
                                    .dataset
                                    .color;



                            control.style
                                .setProperty(

                                    "--nx-accent",

                                    color

                                );



                            lightButtons.forEach(

                                item => {

                                    item
                                        .classList
                                        .remove(
                                            "active"
                                        );

                                }

                            );


                            button
                                .classList
                                .add(
                                    "active"
                                );

                        }

                    );

                }

            );



            /* =============================================
               TEMPERATURA
            ============================================== */

            setInterval(

                () => {


                    shownTemp +=

                        (
                            targetTemp -
                            shownTemp
                        )

                        *

                        .08;



                    if (
                        powered
                    ) {


                        shownTemp +=

                            (
                                Math.random() -
                                .5
                            )

                            *

                            .45;

                    }



                    nxSetText(

                        tempValue,

                        `${Math.round(
                            shownTemp
                        )}°C`

                    );


                    nxPushTemperature(
                        shownTemp
                    );

                },

                350

            );



            nxApplyProfile(
                "balanced"
            );



            /* =============================================
               GRÁFICO DE TEMPERATURA
            ============================================== */

            const canvas =
                control.querySelector(
                    "#nxTempChart"
                );


            const context =
                canvas
                ?.getContext(
                    "2d"
                );


            const temperatureHistory =
                new Array(55)
                    .fill(28);



            function nxResizeCanvas() {


                if (
                    !canvas ||
                    !context
                ) {

                    return;

                }


                const rect =

                    canvas
                        .getBoundingClientRect();


                const ratio =

                    window.devicePixelRatio ||
                    1;



                canvas.width =

                    rect.width *
                    ratio;



                canvas.height =

                    rect.height *
                    ratio;



                context.setTransform(

                    ratio,
                    0,
                    0,
                    ratio,
                    0,
                    0

                );


                nxDrawChart();

            }



            function nxPushTemperature(
                temperature
            ) {


                temperatureHistory.shift();


                temperatureHistory.push(
                    temperature
                );


                nxDrawChart();

            }



            function nxDrawChart() {


                if (
                    !canvas ||
                    !context
                ) {

                    return;

                }


                const width =
                    canvas.clientWidth;


                const height =
                    canvas.clientHeight;



                context.clearRect(
                    0,
                    0,
                    width,
                    height
                );



                context.strokeStyle =
                    "rgba(255,255,255,.05)";


                context.lineWidth =
                    1;



                for (
                    let i = 1;
                    i < 4;
                    i++
                ) {


                    const y =

                        (
                            height /
                            4
                        )

                        *

                        i;


                    context.beginPath();


                    context.moveTo(
                        0,
                        y
                    );


                    context.lineTo(
                        width,
                        y
                    );


                    context.stroke();

                }



                const accent =

                    getComputedStyle(
                        control
                    )

                    .getPropertyValue(
                        "--nx-accent"
                    )

                    .trim()

                    ||

                    "#ff2020";



                context.beginPath();


                context.lineWidth =
                    2;


                context.strokeStyle =
                    accent;



                temperatureHistory
                    .forEach(

                        (
                            temperature,
                            index
                        ) => {


                            const x =

                                index /

                                (
                                    temperatureHistory.length -
                                    1
                                )

                                *

                                width;



                            const normalized =

                                (
                                    temperature -
                                    25
                                )

                                /

                                55;



                            const y =

                                height -

                                normalized *
                                height;



                            if (
                                index === 0
                            ) {

                                context.moveTo(
                                    x,
                                    y
                                );

                            }

                            else {

                                context.lineTo(
                                    x,
                                    y
                                );

                            }

                        }

                    );


                context.stroke();

            }



            window.addEventListener(

                "resize",

                nxResizeCanvas

            );


            setTimeout(
                nxResizeCanvas,
                100
            );



            /* =============================================
               SOM POWER ON
            ============================================== */

            function nxPlayStartupSound() {


                try {


                    const AudioContext =

                        window.AudioContext ||

                        window.webkitAudioContext;



                    if (
                        !AudioContext
                    ) {

                        return;

                    }



                    const audioContext =

                        new AudioContext();



                    const frequencies = [

                        160,

                        220,

                        330,

                        520

                    ];



                    frequencies.forEach(

                        (
                            frequency,
                            index
                        ) => {


                            const oscillator =

                                audioContext
                                    .createOscillator();


                            const gain =

                                audioContext
                                    .createGain();



                            oscillator.type =
                                "sine";


                            oscillator.frequency.value =
                                frequency;



                            gain.gain.setValueAtTime(

                                .0001,

                                audioContext.currentTime

                            );


                            gain.gain.exponentialRampToValueAtTime(

                                .045,

                                audioContext.currentTime +
                                index * .07 +
                                .02

                            );


                            gain.gain.exponentialRampToValueAtTime(

                                .0001,

                                audioContext.currentTime +
                                index * .07 +
                                .25

                            );



                            oscillator.connect(
                                gain
                            );


                            gain.connect(
                                audioContext.destination
                            );


                            oscillator.start(

                                audioContext.currentTime +
                                index * .07

                            );


                            oscillator.stop(

                                audioContext.currentTime +
                                index * .07 +
                                .27

                            );

                        }

                    );


                }

                catch (
                    error
                ) {

                    console.log(
                        "Audio indisponível."
                    );

                }

            }

        }



        /* =====================================================
           BENCHMARKS
        ===================================================== */

        const benchmark =
            document.querySelector(
                "#nexusBenchmarks"
            );


        if (
            benchmark
        ) {


            const gameButtons =

                benchmark
                    .querySelectorAll(
                        ".nx-game-btn"
                    );


            const title =

                benchmark
                    .querySelector(
                        "#nxBenchGameTitle"
                    );


            const note =

                benchmark
                    .querySelector(
                        "#nxBenchGameNote"
                    );


            const rows =

                benchmark
                    .querySelectorAll(
                        ".nx-bench-row"
                    );



            const games = {


                gta: {

                    name:
                        "GTA V ENHANCED",

                    note:
                        "Muito Alto • simulação conceitual",

                    fps:
                        [
                            188,
                            144,
                            91
                        ]

                },


                cyberpunk: {

                    name:
                        "CYBERPUNK 2077",

                    note:
                        "Ultra • Ray Tracing",

                    fps:
                        [
                            154,
                            118,
                            72
                        ]

                },


                forza: {

                    name:
                        "FORZA HORIZON 5",

                    note:
                        "Extreme Preset",

                    fps:
                        [
                            212,
                            169,
                            108
                        ]

                },


                fortnite: {

                    name:
                        "FORTNITE",

                    note:
                        "Epic • DirectX 12",

                    fps:
                        [
                            238,
                            192,
                            121
                        ]

                },


                warzone: {

                    name:
                        "CALL OF DUTY WARZONE",

                    note:
                        "Ultra • qualidade máxima",

                    fps:
                        [
                            176,
                            137,
                            86
                        ]

                }

            };



            function nxShowGame(
                gameKey
            ) {


                const game =
                    games[gameKey];


                if (
                    !game
                ) {

                    return;

                }



                title.textContent =
                    game.name;


                note.textContent =
                    game.note;



                rows.forEach(

                    (
                        row,
                        index
                    ) => {


                        const fps =
                            game.fps[index];


                        const fpsText =

                            row.querySelector(
                                ".nx-bench-fps strong"
                            );


                        const fill =

                            row.querySelector(
                                ".nx-bench-fill"
                            );



                        fpsText.textContent =
                            fps;



                        fill.style.width =
                            "0%";



                        requestAnimationFrame(

                            () => {


                                requestAnimationFrame(

                                    () => {


                                        fill.style.width =

                                            Math.min(

                                                100,

                                                fps /
                                                240 *
                                                100

                                            )

                                            +

                                            "%";

                                    }

                                );

                            }

                        );

                    }

                );

            }



            gameButtons.forEach(

                button => {


                    button.addEventListener(

                        "click",

                        () => {


                            gameButtons.forEach(

                                item => {

                                    item
                                        .classList
                                        .remove(
                                            "active"
                                        );

                                }

                            );


                            button
                                .classList
                                .add(
                                    "active"
                                );


                            nxShowGame(

                                button
                                    .dataset
                                    .game

                            );

                        }

                    );

                }

            );



            const benchObserver =

                new IntersectionObserver(

                    entries => {


                        entries.forEach(

                            entry => {


                                if (
                                    entry.isIntersecting
                                ) {


                                    nxShowGame(
                                        "gta"
                                    );


                                    benchObserver
                                        .disconnect();

                                }

                            }

                        );

                    },

                    {
                        threshold: .25
                    }

                );


            benchObserver.observe(
                benchmark
            );

        }


    }
);

/* =========================================================
   NEXUS CINEMATIC INTRO — EXTREME
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const intro =
            document.querySelector(
                "#nexusCinematicIntro"
            );

        const startButton =
            document.querySelector(
                "#nexusStartExperience"
            );

        const skipButton =
            document.querySelector(
                "#nexusSkipIntro"
            );


        if (!intro || !startButton) {
            return;
        }


        let finished = false;

        let timers = [];


        document.body.classList.add(
            "nexus-intro-locked"
        );


        /* =====================================================
           TIMER
        ===================================================== */

        function nexusTimer(
            callback,
            delay
        ) {

            const timer =
                setTimeout(
                    callback,
                    delay
                );

            timers.push(timer);

        }


        /* =====================================================
           LIMPAR TIMERS
        ===================================================== */

        function clearNexusTimers() {

            timers.forEach(
                timer => {

                    clearTimeout(
                        timer
                    );

                }
            );

            timers = [];

        }


        /* =====================================================
           START
        ===================================================== */

        function startNexusExperience() {

            if (
                intro.classList.contains(
                    "is-playing"
                )
            ) {

                return;

            }


            intro.classList.add(
                "is-playing"
            );


            playExtremeNexusSound();


            /* energia começa */

            nexusTimer(
                () => {

                    intro.classList.add(
                        "phase-power"
                    );

                },
                1500
            );


            /* GPU chegando */

            nexusTimer(
                () => {

                    intro.classList.add(
                        "phase-gpu"
                    );

                },
                2200
            );


            /* impacto */

            nexusTimer(
                () => {

                    intro.classList.add(
                        "phase-impact"
                    );

                },
                4200
            );


            /* scanner */

            nexusTimer(
                () => {

                    intro.classList.add(
                        "phase-scan"
                    );

                },
                4550
            );


            /* informações */

            nexusTimer(
                () => {

                    intro.classList.add(
                        "phase-specs"
                    );

                },
                5050
            );


            /* resultado final */

            nexusTimer(
                () => {

                    intro.classList.add(
                        "phase-ready"
                    );

                },
                6500
            );


            /* libera o site */

            nexusTimer(
                () => {

                    finishNexusIntro(
                        false
                    );

                },
                7900
            );

        }


        /* =====================================================
           FINALIZAR
        ===================================================== */

        function finishNexusIntro(
            skipped
        ) {

            if (finished) {
                return;
            }


            finished = true;


            clearNexusTimers();


            if (skipped) {

                intro.classList.add(
                    "is-skipped"
                );

            }


            intro.classList.add(
                "is-complete"
            );


            document.body.classList.remove(
                "nexus-intro-locked"
            );

        }


        /* =====================================================
           BOTÃO START
        ===================================================== */

        startButton.addEventListener(
            "click",
            startNexusExperience
        );


        /* =====================================================
           PULAR INTRO
        ===================================================== */

        if (skipButton) {

            skipButton.addEventListener(
                "click",
                () => {

                    finishNexusIntro(
                        true
                    );

                }
            );

        }


        /* =====================================================
           SOM MAIS CINEMATOGRÁFICO
        ===================================================== */

        function playExtremeNexusSound() {

            try {

                const AudioContext =
                    window.AudioContext ||
                    window.webkitAudioContext;


                if (!AudioContext) {
                    return;
                }


                const audio =
                    new AudioContext();


                /* =================================================
                   TONE
                ================================================= */

                function tone(
                    frequency,
                    start,
                    duration,
                    volume,
                    type = "sine"
                ) {

                    const oscillator =
                        audio.createOscillator();


                    const gain =
                        audio.createGain();


                    oscillator.type =
                        type;


                    oscillator.frequency
                        .setValueAtTime(
                            frequency,
                            audio.currentTime
                            +
                            start
                        );


                    gain.gain
                        .setValueAtTime(
                            .0001,
                            audio.currentTime
                            +
                            start
                        );


                    gain.gain
                        .exponentialRampToValueAtTime(
                            volume,
                            audio.currentTime
                            +
                            start
                            +
                            .04
                        );


                    gain.gain
                        .exponentialRampToValueAtTime(
                            .0001,
                            audio.currentTime
                            +
                            start
                            +
                            duration
                        );


                    oscillator.connect(
                        gain
                    );


                    gain.connect(
                        audio.destination
                    );


                    oscillator.start(
                        audio.currentTime
                        +
                        start
                    );


                    oscillator.stop(
                        audio.currentTime
                        +
                        start
                        +
                        duration
                        +
                        .1
                    );

                }


                /* =================================================
                   LOW ENGINE
                ================================================= */

                tone(
                    45,
                    .1,
                    2.6,
                    .04,
                    "sine"
                );


                tone(
                    58,
                    .4,
                    2.2,
                    .025,
                    "triangle"
                );


                /* =================================================
                   BOOT
                ================================================= */

                tone(
                    160,
                    .8,
                    .18,
                    .018
                );


                tone(
                    210,
                    1.2,
                    .18,
                    .018
                );


                tone(
                    280,
                    1.6,
                    .2,
                    .02
                );


                /* =================================================
                   GPU POWER
                ================================================= */

                tone(
                    80,
                    2.1,
                    1.3,
                    .035,
                    "sawtooth"
                );


                tone(
                    220,
                    2.2,
                    .7,
                    .018
                );


                tone(
                    440,
                    2.45,
                    .55,
                    .015
                );


                /* =================================================
                   IMPACT
                ================================================= */

                tone(
                    55,
                    4.15,
                    .75,
                    .06,
                    "square"
                );


                tone(
                    880,
                    4.18,
                    .18,
                    .025
                );


                /* =================================================
                   SCANNER
                ================================================= */

                tone(
                    520,
                    4.55,
                    .6,
                    .012,
                    "sawtooth"
                );


                tone(
                    680,
                    4.95,
                    .45,
                    .012
                );


                /* =================================================
                   SYSTEM READY
                ================================================= */

                tone(
                    320,
                    6.45,
                    .22,
                    .025
                );


                tone(
                    520,
                    6.67,
                    .25,
                    .022
                );


                tone(
                    820,
                    6.88,
                    .5,
                    .018
                );

            }

            catch (error) {

                console.log(
                    "NEXUS Audio unavailable."
                );

            }

        }

    }
);