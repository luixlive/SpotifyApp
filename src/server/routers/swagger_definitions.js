/**
 * @swagger
 * definitions:
 *
 *   UserBase:
 *     type: object
 *     properties:
 *       external_urls:
 *         type: object
 *         properties:
 *           spotify:
 *             type: string
 *             format: uri
 *       followers:
 *         type: object
 *         properties:
 *           href:
 *             type: string
 *             format: uri
 *           total:
 *             type: number
 *             format: int64
 *       href:
 *         type: string
 *         format: uri
 *       id:
 *         type: string
 *       images:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             height:
 *               type: number
 *               format: int32
 *             url:
 *               type: string
 *               format: uri
 *             width:
 *               type: number
 *               format: int32
 *       type:
 *         type: string
 *       uri:
 *         type: string
 *         format: uri
 *
 *   User:
 *     type: object
 *     required:
 *       - accessToken
 *       - profile
 *       - refreshToken
 *     properties:
 *       accessToken:
 *         type: string
 *       profile:
 *         type: object
 *         properties:
 *           _json:
 *             allOf:
 *             - $ref: '#/definitions/UserBase'
 *             - type: object
 *               properties:
 *                 display_name:
 *                   type: string
 *       refreshToken:
 *         type: string
 *
 *   Artists:
 *     type: array
 *     items:
 *       allOf:
 *       - $ref: '#/definitions/UserBase'
 *       - type: object
 *         properties:
 *           genres:
 *             type: array
 *             items:
 *               type: string
 *           name:
 *             type: string
 *           popularity:
 *             type: number
 *             format: int32
 */
