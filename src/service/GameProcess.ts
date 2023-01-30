import gsap from 'gsap';

type DataField = {
  h: string | undefined,
  s: HTMLButtonElement,
  n: string
};

class GameProcess {
  private toe: string = '';

  private cross: string = '';

  private AllStep: number = 0;

  private messageGameOver: string = '';

  private maxSteps: number = 9;

  private move: string = '';

  private hasWinner: boolean = false;

  constructor(move: string) {
    this.move = move;
  }

  public setStep(e: string): string {
    const selectedSquare = document.querySelector(`#${e}`) as HTMLButtonElement;
    const numberSquare = selectedSquare.getAttribute('aria-label') as string;
    const hasPlayer = selectedSquare.dataset.player;

    return this.checkField({ h: hasPlayer, s: selectedSquare, n: numberSquare });
  }

  private checkField(activeField: DataField): string {
    if (!activeField.h) {
      this.stepAnimation(activeField.n);
      activeField.s.setAttribute('data-player', `${this.move}`);
      this.addMove(activeField.n[1]);
    }
    if (this.hasWinner || this.AllStep === this.maxSteps) {
      return this.messageGameOver;
    }
    return '';
  }

  private addMove(p: string): void {
    if (this.move === 'cross') {
      this.addMoveToe(p);
    } else {
      this.addMoveCross(p);
    }
  }

  private checkWinner(a: string): boolean {
    const w = ['123', '456', '789', '147', '258', '369', '159', '357'];
    return w.some((i) => i.match(`[${a}]{3}`));
  }

  private addMoveToe(p: string): void {
    this.cross += p;
    this.hasWinner = this.checkWinner(this.cross);
    this.AllStep += 1;
    if (this.hasWinner || this.AllStep === this.maxSteps) {
      this.gameOver();
    }
    this.move = 'toe';
  }

  private addMoveCross(p: string): void {
    this.toe += p;
    this.hasWinner = this.checkWinner(this.toe);
    this.AllStep += 1;
    if (this.hasWinner || this.AllStep === this.maxSteps) {
      this.gameOver();
    }
    this.move = 'cross';
  }

  private gameOver(): void {
    if (this.AllStep === this.maxSteps && !this.hasWinner) {
      this.messageGameOver = 'Draw';
    } else {
      this.messageGameOver = `${this.move} is Winner`;
    }
    this.addAnimation();
  }

  private addAnimation(): void {
    const tl = gsap.timeline();
    tl.to('.main', {
      rotation: 360,
      scale: 0,
      duration: 1,
    });
    tl.to('#output', {
      rotation: 360,
      scale: 2,
      duration: 0.5,
    });
    this.setDefaultSettings();
    this.startGame();
  }

  private stepAnimation(n: string): void {
    gsap.to(`#${n}`, {
      rotation: 360,
      borderRadius: this.move === 'toe' ? '50%' : 0,
      scale: 0.5,
      duration: 0.5,
      border: 0,
    });
  }

  private setDefaultSettings(): void {
    this.toe = '';
    this.cross = '';
    this.AllStep = 0;
    this.messageGameOver = '';
    this.move = '';
    this.hasWinner = false;
  }

  private startGame(): void {
    const o = document.querySelectorAll('[data-player]');
    o.forEach((e) => e.removeAttribute('data-player'));
    gsap.fromTo(
      '.main',
      {
        scale: 0,
        duration: 1,
        stagger: {
          each: 0.8,
          grid: 'auto',
          from: 'center',
        },
      },
      {
        scale: 1,
        duration: 1,
      },
    );

    gsap.to('.box', {
      rotation: 360,
      borderRadius: 0,
      scale: 1,
      duration: 1,
      border: 0,
    });
  }
}

const gameProcess = new GameProcess('toe');
export default gameProcess;
