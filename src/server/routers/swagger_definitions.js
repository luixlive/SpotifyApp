/**
 * @swagger
 *
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
 *   SpotifyItemBase:
 *     type: object
 *     required:
 *       - id
 *       - spotifyUrl
 *     properties:
 *       id:
 *         type: string
 *       spotifyUrl:
 *         type: string
 *         format: uri
 *
 *   UserBase:
 *     type: object
 *     required:
 *       - followers
 *       - imageUrl
 *     allOf:
 *     - $ref: '#/definitions/SpotifyItemBase'
 *     - type: object
 *       properties:
 *         followers:
 *           type: number
 *           format: int32
 *         imageUrl:
 *           type: string
 *           format: uri
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
 *
 *   User:
 *     type: object
 *     required:
 *       - accessToken
 *       - expires
 *       - profile
 *       - refreshToken
 *       - type
 *     properties:
 *       accessToken:
 *         type: string
 *       expires:
 *         type: number
 *         format: int32
 *       profile:
 *         allOf:
 *         - $ref: '#/definitions/UserBase'
 *         - type: object
 *           properties:
 *             displayName:
 *               type: string
 *             type:
 *               type: string
 *       refreshToken:
 *         type: string
 *
 *   Tracks:
 *     type: array
 *     items:
 *       required:
 *         - album
 *         - artists
 *         - durationMs
 *         - name
 *         - popularity
 *         - trackNumber
 *       allOf:
 *       - $ref: '#/definitions/SpotifyItemBase'
 *       - type: object
 *         properties:
 *           album:
 *             type: object
 *             properties:
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *               name:
 *                 type: string
 *               spotifyUrl:
 *                 type: string
 *                 format: uri
 *           artists:
 *             type: array
 *             items:
 *               allOf:
 *               - $ref: '#/definitions/SpotifyItemBase'
 *               - type: object
 *                 properties:
 *                   name:
 *                     type: string
 *           durationMs:
 *             type: number
 *             format: int32
 *           name:
 *             type: string
 *           popularity:
 *             type: number
 *             format: int32
 *           trackNumber:
 *             type: number
 *             format: int32
 *
 *
 * parameters:
 *
 *   SessionCookie:
 *     in: cookie
 *     name: session
 *     description: Session cookie signed
 *     default: Set it in the browser, leave this field as it is
 *     schema:
 *       type: string
 *
 *   SignatureCookie:
 *     in: cookie
 *     name: session.sig
 *     description: Signature key for the Session cookie
 *     default: Set it in the browser, leave this field as it is
 *     schema:
 *       type: string
 *
 *   ItemsLimit:
 *     in: query
 *     name: limit
 *     description: Number of items (minimum 1, maximum 50)
 *     default: 20
 *     type: number
 *     format: int32
 *     minimum: 1
 *     maximum: 50
 *
 *   ItemsOffset:
 *     in: query
 *     name: offset
 *     description: Offset value (minimum 0)
 *     default: 0
 *     type: number
 *     format: int32
 *     minimum: 0
 *
 *   ItemsTimeRange:
 *     in: query
 *     name: timeRange
 *     description: Time range to take into account
 *     type: string
 *     default: medium_term
 *     enum: [long_term, medium_term, short_term]
 *
 *
 * responses:
 *
 *   OK:
 *     description: OK
 *   NoContent:
 *     description: No Content
 *   BadRequest:
 *     description: Bad Request
 *     schema:
 *       $ref: '#/definitions/Error'
 *   Unauthorized:
 *     description: Unauthorized
 *     schema:
 *       $ref: '#/definitions/Error'
 *   BadGateway:
 *     description: Bad Gateway
 *     schema:
 *       $ref: '#/definitions/Error'
 */
