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
