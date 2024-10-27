import { GraphQLString } from "graphql";
import TokenType from "./tokenSchema";
import TokenService from "../../services/tokenService";
import UserModel from "../user/userModel";

const TokenResolver = {
    tokenRefresh: {
        type: TokenType,
        args: {
            refreshToken: { type: GraphQLString }
        },
        async resolve(_, { refreshToken }) {
            if (!refreshToken) {
                throw new Error("Unauthorized access");
            }

            // Validate the provided refresh token
            const validateToken = TokenService.validateToken(refreshToken, process.env.JWT_REFRESH_SECRET);
            if (!validateToken) {
                throw new Error("Unauthorized access - Invalid token");
            }

            // Check if refresh token exists in the database
            const tokenFromDatabase = await TokenService.findToken(refreshToken);
            if (!tokenFromDatabase || tokenFromDatabase.refreshToken !== refreshToken) {
                throw new Error("Unauthorized access - Token not found");
            }

            // Get the user ID from the validated token
            const userId = validateToken.id;
            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error("Unauthorized access - User not found");
            }

            // Generate new tokens
            const newTokens = TokenService.generateToken({ id: user._id });

            // Save the new refresh token in the database
            await TokenService.saveToken(user._id, newTokens.refreshToken);

            return {
                accessToken: newTokens.accessToken,
                refreshToken: newTokens.refreshToken
            };
        }
    }
};

export default TokenResolver;