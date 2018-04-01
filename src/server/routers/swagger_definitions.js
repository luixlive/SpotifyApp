/**
 * @swagger
 * definitions:
 *
 *   Error:
 *     type: object
 *     required:
 *       - error
 *     properties:
 *       error:
 *         type: string
 *
 *   UserBase:
 *     type: object
 *     required:
 *       - externalUrls
 *       - followers
 *       - href
 *       - id
 *       - images
 *       - type
 *       - uri
 *     properties:
 *       externalUrls:
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
 *         allOf:
 *         - $ref: '#/definitions/UserBase'
 *         - type: object
 *           properties:
 *             displayName:
 *               type: string
 *       refreshToken:
 *         type: string
 *
 *   Artists:
 *     type: array
 *     items:
 *       required:
 *         - genres
 *         - name
 *         - popularity
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
