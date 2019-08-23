interface Level {
  // Statique. Ne change pas.
  fixed: {
    map: Array<Array<number>>;
  }

  // Lié à ce que fait l'utilisateur.
  user: {
    success: boolean;
  }
}

export class Storage {
  // public constructor() {
  // }

  public getLevels(): Array<Level> {
    return [
      {
        fixed: {
          map: [
            [  2,  2,  2,  2,  2,  2,  2,  2,  2 ],
            [  2, 14,  0,  8,  8,  0,  0,  0,  2 ],
            [  2,  0,  0,  0,  0,  7,  4,  0,  2 ],
            [  2,  0,  0, 10,  0,  7,  0,  0,  2 ],
            [  2, 16, 17,  0,  0,  0,  0,  0,  2 ],
            [  2, 16, 17, 17,  0,  0,  0,  0,  2 ],
            [  2,  0,  0,  2,  2,  0, 18,  0,  2 ],
            [  2,  0,  0,  0,  2,  0,  0, 15,  2 ],
            [  2,  2,  2,  2,  2,  2,  2,  2,  2 ],
          ],
        },

        user: {
          success: false,
        },
      },

      {
        fixed: {
          map: [
            [  2,  2,  2,  2,  2,  2,  2,  2,  2 ],
            [  2, 14,  0,  0,  0,  0,  0,  0,  2 ],
            [  2,  0,  0,  0,  0,  0,  0,  0,  2 ],
            [  2,  0,  0,  0,  0,  0,  0,  0,  2 ],
            [  2,  0,  0,  0,  0,  0,  0,  0,  2 ],
            [  2,  0,  0,  0,  0,  0,  0,  0,  2 ],
            [  2,  0,  0,  0,  0,  0,  0,  0,  2 ],
            [  2,  0,  0,  0,  0,  0,  0, 15,  2 ],
            [  2,  2,  2,  2,  2,  2,  2,  2,  2 ],
          ],
        },

        user: {
          success: false,
        },
      },
    ]
  }
}
