/**
 * @swagger
 * definitions:
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
 *             type: object
 *             properties:
 *               display_name:
 *                 type: string
 *               external_urls:
 *                 type: object
 *                 properties:
 *                   spotify:
 *                     type: string
 *                     format: uri
 *               followers:
 *                 type: object
 *                 properties:
 *                   href:
 *                     type: string
 *                     format: uri
 *                   total:
 *                     type: number
 *                     format: int64
 *               href:
 *                 type: string
 *                 format: uri
 *               id:
 *                 type: string
 *               images:
 *                 type: object
 *                 properties:
 *                   height:
 *                     type: number
 *                     format: int32
 *                   url:
 *                     type: string
 *                     format: uri
 *                   width:
 *                     type: number
 *                     format: int32
 *               type:
 *                 type: string
 *               uri:
 *                 type: string
 *                 format: uri
 *       refreshToken:
 *         type: string
 */
