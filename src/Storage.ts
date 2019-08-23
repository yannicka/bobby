interface Level {
  fixed: {
    map: Array<Array<number>>;
  }

  user: {
    success: boolean;
  }
}

export default class Storage {
  // public constructor() {
  // }

  public getLevels(): Array<Level> {
    return [
      {
        fixed: {
          map: [
            [  2,  2,  2,  2,  2,  2,  2,  2,  2 ],
            [  2, 14,  1,  8,  8,  1,  1,  1,  2 ],
            [  2,  1,  1,  1,  1,  7,  4,  1,  2 ],
            [  2,  1,  1, 10,  1,  7,  1,  1,  2 ],
            [  2, 16, 17,  1,  1,  1,  1,  1,  2 ],
            [  2, 16, 17, 17,  1,  1,  1,  1,  2 ],
            [  2,  1,  1,  2,  2,  1, 18,  1,  2 ],
            [  2,  1,  1,  1,  2,  1,  1, 15,  2 ],
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
            [  2, 14,  1,  1,  1,  1,  1,  1,  2 ],
            [  2,  1,  1,  1,  1,  1,  1,  1,  2 ],
            [  2,  1,  1,  1,  1,  1,  1,  1,  2 ],
            [  2,  1,  1,  1,  1,  1,  1,  1,  2 ],
            [  2,  1,  1,  1,  1,  1,  1,  1,  2 ],
            [  2,  1,  1,  1,  1,  1,  1,  1,  2 ],
            [  2,  1,  1,  1,  1,  1,  1, 15,  2 ],
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