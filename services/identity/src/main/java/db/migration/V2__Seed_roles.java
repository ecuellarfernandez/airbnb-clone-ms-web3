package db.migration;

import org.flywaydb.core.api.configuration.Configuration;
import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;
import org.flywaydb.core.api.resolver.ResolvedMigration;
import org.flywaydb.core.extensibility.MigrationType;
import org.flywaydb.core.internal.jdbc.StatementInterceptor;

import java.sql.PreparedStatement;

public class V2__Seed_roles extends BaseJavaMigration {
    @Override
    public ResolvedMigration getResolvedMigration(Configuration config, StatementInterceptor statementInterceptor) {
        return super.getResolvedMigration(config, statementInterceptor);
    }

    @Override
    public void migrate(Context context) throws Exception {
        try (PreparedStatement stmt = context.getConnection().prepareStatement(
                "INSERT INTO roles (name, description, active) VALUES (?, ?, ?)")) {

            stmt.setString(1, "CLIENT");
            stmt.setString(2, "Standard user");
            stmt.setBoolean(3, true);
            stmt.executeUpdate();

            stmt.setString(1, "HOST");
            stmt.setString(2, "Host with listings");
            stmt.setBoolean(3, true);
            stmt.executeUpdate();

            stmt.setString(1, "ADMIN");
            stmt.setString(2, "Administrator");
            stmt.setBoolean(3, true);
            stmt.executeUpdate();
        }catch (Exception ex){
            throw new Exception("Error seeding roles: " + ex.getMessage());
        }
    }

    @Override
    public MigrationType getType() {
        return super.getType();
    }
}
