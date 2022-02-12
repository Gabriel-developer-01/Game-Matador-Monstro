new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        qtdSpecial: 4,
        qtdHeal: 4,
        logs: []
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame() {
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.qtdSpecial = 4
            this.qtdHeal = 4
            this.logs = []
        },
        attack(especial) {
            this.amountOfSpecial(especial)
            this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player')
            if(this.monsterLife > 0) {
                this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
            }
        },
        hurt(prop, min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
        },
        damageWhenHealing(min, max, target, cls) {
            const damage = this.getRandom(min, max)
            this.playerLife = Math.max(this.playerLife - damage, 0)
            this.registerLog(`${target} recebeu dano de ${damage} ao se curar`, cls)
        },
        healAndHurt() {
            this.heal(10, 15)
            this.damageWhenHealing(7, 12, 'Jogador', 'avisoCurar')
        },
        heal(min, max) {
            this.amountOfCure()
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`Jogador ganhou força de ${heal}.`, 'curar')
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLog(text, cls) {
            this.logs.unshift({ text, cls })
        },
        giveUp(){
            this.running = false
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
        },
        amountOfCure() {
            if(this.qtdHeal > 0){
                this.qtdHeal--
            }
        },
        amountOfSpecial(especial) {
            if(especial && this.qtdSpecial > 0){
                this.qtdSpecial--
            }
        },
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false
        }
    }
})