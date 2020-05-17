<template>
    <div id="app">
        <app-nav />
        <main class="main-main">
            <router-view />
        </main>
    </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Heebo");
* {
    box-sizing: border-box;
}

html {
    position: relative;
    min-height: 100%;
}
body {
    margin: 0;
    padding: 0;
    font-family: "Heebo", serif;
    @include vendor(user-select, none);
    background-color: $background;

    .main-main {
        height: calc(100vh - 3.5rem);
        //padding: 1rem;
        margin: 0 auto;
        overflow-y: auto;

        .container {
            width: 90%;
            max-width: 45rem;
            margin: 0 auto;
        }

        .centered {
            text-align: center;
        }

        .grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: stretch;
        }

        .card {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
            border-radius: 0.7rem;
            padding: 1rem 0;

            &__header,
            &__content {
                padding: 1rem;

                h1,
                h2,
                p {
                    margin: 0;
                }
            }

            &__image {
                text-align: center;
                width: 100%;
                height: 10rem;

                img {
                    max-width: 100%;
                    max-height: 10rem;
                }
            }

            &__actions {
                padding: 1rem;
                text-align: center;

                form {
                    display: inline;
                }

                button,
                a {
                    text-decoration: none;
                    margin: 0 0.25rem;
                }
            }
        }

        .image {
            max-height: 20rem;

            @include desktop {
                height: 20rem;
            }

            img {
                max-height: 100%;
                max-width: 100%;
            }
        }

        .code {
            display: inline-block;
            background-color: #eee;
            border-radius: 5px;
            font-family: courier, monospace;
            padding: 0.7rem;
            margin: 0.4rem;
            text-align: left;
            white-space: pre;
            direction: ltr;
        }
    }
}
</style>
